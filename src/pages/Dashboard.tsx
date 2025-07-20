import { useEffect, useState } from 'react';
import { Button } from "../components/Button";
import { Card } from '../components/Card';
import { CreateContentModal } from '../components/CreateContentModal';
import { PlusIcon } from '../icons/PlusIcon';
import { ShareIcon } from '../icons/ShareIcon';
import { Sidebar } from '../components/Sidebar';
import { useContent } from '../hooks/useContent';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { Loader } from '../components/Loader';
import { Logout } from '../icons/LogoutIcon';
import Askai from './Askai';
import { timeAgo } from '../utils';
import DocumentModal from './DocumentViewer';

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, refresh } = useContent();
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("home");
  const [historyContent, setHistoryContent] = useState<any[]>([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);

  interface HistoryState {
    docTitle: string;
    docLink: string;
    docType: string;
    initialConversation: any[];
    update?: boolean;
    historyId?: string;
  }

  const [selectedHistory, setSelectedHistory] = useState<HistoryState | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin");
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const fetchHistory = async () => {
      setIsHistoryLoading(true);
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/conversations/history`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setHistoryContent(response.data.histories || []);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setIsHistoryLoading(false);
      }
    };

    if (filter === "history") {
      fetchHistory();
    }
  }, [filter]);

  if (isLoading) return <Loader />;

  return (
    <div>
      <Sidebar onFilterChange={setFilter} activeFilter={filter} />

      <div className='p-4 ml-72 min-h-screen bg-gray-100 border-1'>
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onContentCreated={refresh}
        />

        {/* Top bar */}
        <div className='flex justify-between items-center mb-6'>
          <div className='flex gap-4'>
            <Button
              onClick={() => setModalOpen(true)}
              variant='primary'
              text='Add content'
              startIcon={<PlusIcon />}
            />
            <Button
              onClick={async () => {
                try {
                  const response = await axios.post(
                    `${BACKEND_URL}/api/v1/brain/share`,
                    { share: true },
                    {
                      headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                      },
                    }
                  );
                  const newHash = response.data.hash;
                  const url = `http://localhost:5173/brain/${newHash}`;
                  navigator.clipboard.writeText(url);
                  localStorage.setItem("hash", newHash);
                  alert("Link Copied");
                } catch (error) {
                  console.error("Error sharing:", error);
                }
              }}
              variant='secondary'
              text='Share brain'
              startIcon={<ShareIcon />}
            />
          </div>

          <div className='flex gap-4'>
            <Button
              startIcon={<Logout />}
              onClick={() => {
                setIsLoggedIn(false);
                localStorage.removeItem("token");
                navigate("/signin");
              }}
              variant='primary'
              text='Logout'
            />
          </div>
        </div>

        {/* Main Content */}
        {filter === "home" ? (
          <Askai />
        ) : filter === "history" ? (
          isHistoryLoading ? (
            <Loader />
          ) : (
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold mb-2">Chat History</h2>
              <p className="text-gray-600 mb-4">Manage and continue your conversations</p>

              {historyContent.length > 0 ? (
                historyContent.map(({ title, createdAt, _id }: any) => (
                  <div
                    key={_id}
                    className="flex justify-between items-center border-b border-gray-300 pb-3"
                  >
                    {/* Left: Clickable area */}
                    <div
                      onClick={async () => {
                        try {
                          const res = await axios.get(
                            `${BACKEND_URL}/api/v1/conversations/history/${_id}`,
                            {
                              headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('token'),
                              },
                            }
                          );

                          const { title, contentLink, type, chats } = res.data.history;

                          setSelectedHistory({
                            docTitle: title,
                            docLink: contentLink,
                            docType: type,
                            initialConversation: chats,
                            update: true,
                            historyId: _id,
                          });
                        } catch (error) {
                          console.error("Error fetching specific chat history:", error);
                          alert("Failed to open chat history.");
                        }
                      }}
                      className="cursor-pointer hover:underline flex-grow"
                    >
                      <h3 className="text-lg font-medium text-black">{title}</h3>
                      <p className="text-sm text-gray-500">🕓 {timeAgo(new Date(createdAt))}</p>
                    </div>

                    {/* Right: Delete button */}
                    <button
                      onClick={async (e) => {
                        e.stopPropagation(); // prevent click propagation
                        if (!window.confirm("Are you sure you want to delete this history?")) return;

                        try {
                          await axios.delete(`${BACKEND_URL}/api/v1/conversations/history/${_id}`, {
                            headers: {
                              Authorization: 'Bearer ' + localStorage.getItem('token'),
                            },
                          });

                          setHistoryContent(prev => prev.filter(item => item._id !== _id));
                        } catch (error) {
                          console.error("Error deleting history:", error);
                          alert("Failed to delete history.");
                        }
                      }}
                      className="cursor-pointer hover:underline text-sm ml-4"
                    >
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <p>No history found.</p>
              )}
            </div>
          )
        ) : (
          <div className="flex gap-4 flex-wrap">
            {contents
              .filter(({ type }) => type === filter || filter === "all")
              .map(({ type, link, title, _id }) => (
                <Card
                  key={_id}
                  type={type}
                  link={link}
                  title={title}
                  id={_id}
                  onDelete={refresh}
                />
              ))}
          </div>
        )}
      </div>

      {/* Modal for chat viewing/updating */}
      {selectedHistory && (
        <DocumentModal
          docTitle={selectedHistory.docTitle}
          docLink={selectedHistory.docLink}
          docType={selectedHistory.docType}
          initialConversation={selectedHistory.initialConversation}
          update={selectedHistory.update}
          historyId={selectedHistory.historyId}
          onClose={() => setSelectedHistory(null)}
        />
      )}
    </div>
  );
}

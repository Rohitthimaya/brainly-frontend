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
import { useHash } from '../hooks/useHash';
import { Sparkles } from 'lucide-react';

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false)
  const { contents, refresh } = useContent();
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const { setHash } = useHash(); 

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin")
    } else {
      setIsLoading(false)
    }
  }, [isLoggedIn])

  console.log(contents)

  if (isLoading) {
    return <Loader />
  }

  return (

    <div>
      <Sidebar onFilterChange={setFilter} activeFilter={filter} />
      <div className='p-4 ml-72 min-h-screen bg-gray-100 border-1'>
        {/* <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} /> */}
        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} onContentCreated={refresh} />
        {/* Top bar with buttons */}
        <div className='flex justify-between items-center mb-6'>
          {/* Left side buttons */}
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
                        Authorization: "Bearer " + localStorage.getItem("token")
                      }
                    }
                  );
                  const newHash = response.data.hash;
                  const url = `http://localhost:5173/brain/${newHash}`;
                  navigator.clipboard.writeText(url);
                  localStorage.setItem("hash", newHash)
                  alert("Link Copied")
                } catch (error) {
                  console.error("Error sharing:", error);
                }
              }}

              variant='secondary'
              text='Share brain'
              startIcon={<ShareIcon />}
            />
          </div>

          {/* Right side logout */}
         <div className='flex gap-4'>
         <Button
          startIcon={<Sparkles className="w-6 h-6" />}
            onClick={() => {
              navigate("/ask");
            }}
            variant='primary'
            text='Ask AI'
          />
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

        {/* Content Cards */}
        <div className='flex gap-4 flex-wrap'>
          {contents.filter(({ type }) => filter === "all" || type === filter).map(({ type, link, title, _id }) => (
            <Card key={link} type={type} link={link} title={title} id={_id} onDelete={refresh} />
          ))}
        </div>
      </div>
    </div>
  );

}

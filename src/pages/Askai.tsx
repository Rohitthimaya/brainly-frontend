import { useState } from 'react';
import { BookOpen, Database, Send } from 'lucide-react';
import { Button } from '../components/Button';
import axios from 'axios';
import DocumentModal from './DocumentViewer';

export default function Search() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<null | {
    answer: string;
    title: string;
    context: string[];
    responseLink: string;
    type: string
  }>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResponse(null);

    try {
      const res = await axios.post(
        'http://localhost:3000/query',
        { query: input },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          }
        }
      );
      setResponse(res.data);
      console.log('Response from /query:', res.data);
    } catch (error) {
      console.error('Error sending query:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center p-6 sm:p-10">

      {/* Gradient Header */}
      <div className="w-full max-w-6xl bg-[linear-gradient(120deg,_#7164c0,_#9492db,_#d9ddee)] rounded-3xl shadow-md px-8 py-6 text-white mb-8">
        <div className="text-3xl sm:text-4xl font-bold">Ask Recalr AI</div>
        <div className="text-sm sm:text-base mt-2 text-purple-100">Get answers from your uploaded content</div>
      </div>

      {/* Search Bar Card */}
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-4 transition">
        <div className="flex items-center gap-3">
          <Database className="w-6 h-6 text-[var(--purple-600)]" />
          <input
            className="flex-grow bg-transparent outline-none placeholder-gray-500 text-base"
            placeholder="Ask or find anything from your workspace..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition ${
              loading
                ? 'bg-gray-300'
                : 'bg-[var(--purple-600)] hover:bg-[var(--purple-500)]'
            }`}
          >
            <Send className="w-5 h-5 text-white rotate-45" />
          </button>
        </div>
      </div>

      {/* Optional Loading */}
      {loading && (
        <div className="mt-6 text-sm text-gray-500 flex items-center gap-2 animate-pulse">
          <span className="w-3 h-3 rounded-full bg-[var(--purple-600)] animate-bounce" />
          Thinking...
        </div>
      )}

      {/* Response Card */}
      {response && (
        <div className="w-full max-w-6xl bg-white mt-6 p-6 rounded-xl shadow border border-gray-200 transition-opacity duration-500">
          <h2 className="text-lg font-semibold mb-3 text-[var(--purple-600)] flex items-center justify-between">
            {response.title}
            <button
              onClick={() => {
                setSelectedDoc(response.title);
                setShowModal(true);
              }}
              className="text-gray-400 hover:text-[var(--purple-600)] transition p-1 rounded"
              title="View source"
            >
              <BookOpen className="w-5 h-5" />
            </button>
          </h2>
          <div className="text-gray-800 space-y-4 leading-relaxed">
            {response.answer
              .split(/\n(?=\d+\.\s)/)
              .map((block, idx) => {
                const match = block.trim().match(/^(\d+)\.\s(.+?)([:\-–])\s(.+)$/);
                if (match) {
                  const [, number, title, , desc] = match;
                  return (
                    <div key={idx}>
                      <span className="font-semibold">
                        {number}. {title}
                      </span>
                      <span>: {desc}</span>
                    </div>
                  );
                }
                return <p key={idx}>{block.trim()}</p>;
              })}
          </div>
        </div>
      )}

      {/* Document Modal */}
      {showModal && (
        <DocumentModal
          docType={response ? response.type : ""}
          docTitle={selectedDoc}
          docLink={response?.responseLink}
          onClose={() => {
            setShowModal(false);
            setSelectedDoc('');
          }}
        />
      )}
    </div>
  );
}

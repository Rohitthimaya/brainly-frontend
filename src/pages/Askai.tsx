import { useState } from 'react';
import { BookOpen, Database, Send } from 'lucide-react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Search() {
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const [response, setResponse] = useState<null | {
        answer: string;
        title: string;
        context: string[];
        link: string
    }>(null);
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        setLoading(true);
        setResponse(null);

        try {
            const res = await axios.post('http://localhost:3000/query', {
                query: input,
            });
            setResponse(res.data);
            console.log('Response from /query:', res.data);
        } catch (error) {
            console.error('Error sending query:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center p-4">
            {/* Top-left Dashboard Button */}
            <div className="absolute top-4 left-4">
                <Button
                    startIcon={<Database className="w-6 h-6" />}
                    onClick={() => {
                        navigate('/dashboard');
                    }}
                    variant="secondary"
                    text="Dashboard"
                />
            </div>

            {/* Greeting */}
            <div className="text-3xl font-semibold my-8">How can I help you?</div>

            {/* Search Bar */}
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md px-6 py-4">
                <div className="flex items-center gap-3">
                    <Database className="w-6 h-6 text-gray-500" />
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
                        className={`w-8 h-8 flex items-center justify-center rounded-full ${loading ? 'bg-gray-200' : 'bg-gray-300 hover:bg-gray-400'
                            } transition cursor-pointer`}
                    >
                        <Send className="w-4 h-4 text-white rotate-40" />
                    </button>
                </div>
            </div>

            {/* Response Area */}
            {response && (
                <div className="w-full max-w-4xl bg-white mt-6 p-6 rounded-xl shadow border border-gray-200">
                    <h2 className="text-lg font-semibold mb-2 text-blue-600">{response.title} <button
                        title="View source"
                        className="text-gray-400 hover:text-blue-600 transition p-1 rounded"
                    >
                        <a href={response.link} target='_blank'><BookOpen className="w-5 h-5" /></a>
                        
                    </button></h2>
                    <div className="text-gray-800 space-y-4 leading-relaxed">
                        {response.answer.split(/\n(?=\d+\.\s)/).map((block, idx) => {
                            // Match numbered list items like "1. Title: description"
                            const match = block.trim().match(/^(\d+)\.\s(.+?)([:\-–])\s(.+)$/);
                            if (match) {
                                const [, number, title, , desc] = match;
                                return (
                                    <div key={idx}>
                                        <span className="font-semibold">{number}. {title}</span>
                                        <span>: {desc}</span>
                                    </div>
                                );
                            }
                            return <p key={idx}>{block.trim()}</p>;
                        })}
                    </div>
                </div>
            )}

            {/* Optional Loading */}
            {loading && (
                <div className="mt-4 text-gray-500 text-sm animate-pulse">Thinking...</div>
            )}
        </div>
    );
}

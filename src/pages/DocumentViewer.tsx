import { useEffect, useState } from 'react';
import axios from 'axios';
import { X, Copy } from 'lucide-react';

interface Props {
    docTitle: string;
    docLink: string | undefined;
    docType: 'youtube' | 'tweet' | 'pdf' | 'docx' | string;
    onClose: (conversation: { question: string; answer: string }[]) => void;
}

interface QA {
    question: string;
    answer: string;
}

export default function DocumentModal({ docTitle, docLink, docType, onClose }: Props) {
    const [question, setQuestion] = useState('');
    const [conversation, setConversation] = useState<QA[]>([]);
    const [loading, setLoading] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    useEffect(() => {
        if (docType === 'tweet') {
            if (!(window as any).twttr) {
                const script = document.createElement('script');
                script.src = 'https://platform.twitter.com/widgets.js';
                script.async = true;
                document.body.appendChild(script);
            } else {
                (window as any).twttr.widgets.load();
            }
        }
    }, [docType, docLink]);

    const handleQuestion = async () => {
        if (!question.trim()) return;

        const currentQuestion = question;
        setQuestion('');
        setLoading(true);

        try {
            const res = await axios.post(
                `http://localhost:3000/ask-doc`,
                { link: docTitle, question: currentQuestion },
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                }
            );

            setConversation(prev => [...prev, { question: currentQuestion, answer: res.data.answer }]);
        } catch (err) {
            console.error('Error asking question:', err);
            setConversation(prev => [...prev, { question: currentQuestion, answer: '⚠️ Error fetching response.' }]);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        onClose(conversation);
    };

    const getYoutubeEmbedUrl = (link: string) => {
        const match = link.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        return match ? `https://www.youtube.com/embed/${match[1]}` : '';
    };

    const getGoogleDocsViewerUrl = (link: string) => {
        return `https://docs.google.com/gview?url=${encodeURIComponent(link)}&embedded=true`;
    };

    const renderContent = () => {
        if (!docLink) return null;

        switch (docType) {
            case 'youtube':
                return (
                    <iframe
                        src={getYoutubeEmbedUrl(docLink)}
                        title="YouTube video"
                        className="w-full aspect-video rounded-xl"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                );
            case 'tweet':
                return (
                    <blockquote className="twitter-tweet">
                        <a href={docLink.replace('x.com', 'twitter.com')} />
                    </blockquote>
                );
            case 'pdf':
                return (
                    <iframe
                        src={docLink}
                        title="PDF viewer"
                        className="w-full h-[75vh] rounded-md"
                    />
                );
            case 'docx':
                return (
                    <iframe
                        src={getGoogleDocsViewerUrl(docLink)}
                        title="DOCX viewer"
                        className="w-full h-[75vh] rounded-md"
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="w-[90vw] h-[90vh] bg-white rounded-xl shadow-lg overflow-hidden flex">
                {/* Left Panel - Content */}
                <div className="w-2/3 bg-black p-6 flex flex-col items-center overflow-y-auto">
                    <div className="w-full flex justify-between items-center mb-4">
                        <h1 className="text-white text-xl font-semibold">{docTitle}</h1>
                        <button onClick={handleClose} className="text-white hover:text-gray-400">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="w-full max-w-3xl mb-6">
                        {renderContent()}
                    </div>
                </div>

                {/* Right Panel - Chat */}
                <div className="w-1/3 h-full bg-[#1f1f1f] text-white flex flex-col border-l border-gray-700">
                    <div className="flex border-b border-gray-700">
                        <div className="px-4 py-3 border-b-2 border-white font-semibold">Chat</div>
                        {/* <div className="px-4 py-3 text-gray-400 hover:text-white cursor-pointer">Notes</div> */}
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 text-sm">
                        <div className="text-gray-300">
                            Hello, I can answer questions based on this memory. How can I help you today?
                        </div>

                        {conversation.map((qa, idx) => (
                            <div key={idx} className="bg-[#2a2a2a] p-3 rounded-md relative group">
                                <p className="text-purple-400 font-semibold">{qa.question}</p>
                                <pre className="text-gray-100 mt-1 whitespace-pre-wrap">{qa.answer}</pre>

                                {/* Copy Icon Button */}
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(qa.answer);
                                        setCopiedIndex(idx);
                                        setTimeout(() => setCopiedIndex(null), 2000);
                                    }}
                                    className="absolute cursor-pointer top-2 right-2 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition"
                                    title="Copy"
                                >
                                    <Copy size={16} />
                                </button>

                                {/* Copied Message */}
                                {copiedIndex === idx && (
                                    <span className="absolute -top-6 right-2 text-xs text-green-400 bg-black bg-opacity-80 px-2 py-1 rounded shadow">
                                        Copied!
                                    </span>
                                )}
                            </div>
                        ))}



                        {loading && (
                            <div className="bg-[#2a2a2a] p-3 rounded-md flex flex-col gap-2">
                                <p className="text-purple-400 font-semibold">{question}</p>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    {/* <span>Loading response...</span> */}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t border-gray-700 space-y-2">
                        <div className="relative">
                            <textarea
                                className="w-full resize-none bg-[#2b2b2b] text-white placeholder-gray-400 rounded-md px-3 py-2 pr-20 text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                rows={1}
                                placeholder="Ask your question here..."
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleQuestion();
                                    }
                                }}
                            />
                            <button
                                onClick={handleQuestion}
                                disabled={loading}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-500 transition disabled:opacity-50"
                            >
                                Ask
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

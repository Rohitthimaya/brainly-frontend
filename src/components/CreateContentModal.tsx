import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { XMarkIcon, DocumentArrowUpIcon, LinkIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import { Button } from "./Button";
import { Input } from "./Input";

enum ContentType {
    Youtube = "youtube",
    Twitter = "tweet",
    Pdf = "pdf",
    Docx = "docx",
}

interface CreateContentModalProps {
    open: boolean;
    onClose: () => void;
    onContentCreated: () => void;
}

export function CreateContentModal({ open, onClose, onContentCreated }: CreateContentModalProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState<ContentType>(ContentType.Youtube);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

    useEffect(() => {
        if (!open) {
            setSelectedFileName(null);
            if (fileRef.current) {
                fileRef.current.value = "";
            }
        }
    }, [open]);

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        const file = fileRef.current?.files?.[0];

        if (!title || (![ContentType.Pdf, ContentType.Docx].includes(type) && !link)) {
            setError("All fields are required.");
            return;
        }

        setUploading(true);
        setError("");

        try {
            if ([ContentType.Pdf, ContentType.Docx].includes(type) && file) {
                const formData = new FormData();
                formData.append("type", type);
                formData.append("title", title || file.name);
                formData.append("file", file);

                await axios.post(`${BACKEND_URL}/api/v1/content`, formData, {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    }
                });
            } else {
                await axios.post(`${BACKEND_URL}/api/v1/content`, {
                    title,
                    link,
                    type
                }, {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });
            }

            onClose();
            onContentCreated();
        } catch (err) {
            console.error("Upload error:", err);
            setError("Failed to upload content.");
        } finally {
            setUploading(false);
        }
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm"></div>

            <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-md z-10 space-y-5 relative animate-fade-in">
                <button onClick={onClose} className="absolute top-3 right-3 p-1 text-gray-500 hover:text-red-600">
                    <XMarkIcon className="h-5 w-5" />
                </button>

                <h2 className="text-xl font-semibold text-center">Add New Content</h2>

                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Title</label>
                        <Input reference={titleRef} placeholder="Enter title" />
                    </div>

                    {[ContentType.Pdf, ContentType.Docx].includes(type) ? (
                        <div>
                            <label className="text-sm font-medium text-gray-700">Upload {type.toUpperCase()}</label>
                            <div className="mt-2">
                                <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md cursor-pointer hover:bg-blue-700">
                                    Choose File
                                    <input
                                        type="file"
                                        accept={
                                            type === ContentType.Pdf
                                                ? "application/pdf"
                                                : type === ContentType.Docx
                                                    ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                    : "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                                        }
                                        ref={fileRef}
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setSelectedFileName(file.name);
                                            }
                                        }}
                                    />
                                </label>
                                {selectedFileName && (
                                    <p className="mt-2 text-sm text-gray-600">Selected: {selectedFileName}</p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <label className="text-sm font-medium text-gray-700">Link</label>
                            <Input reference={linkRef} placeholder="Paste link here" />
                        </div>
                    )}

                    <div>
                        <label className="text-sm font-medium text-gray-700">Content Type</label>
                        <div className="flex gap-2 mt-1 flex-wrap">
                            <ContentTypeButton
                                icon={<VideoCameraIcon className="w-4 h-4" />}
                                label="YouTube"
                                active={type === ContentType.Youtube}
                                onClick={() => setType(ContentType.Youtube)}
                            />
                            <ContentTypeButton
                                icon={<LinkIcon className="w-4 h-4" />}
                                label="Twitter"
                                active={type === ContentType.Twitter}
                                onClick={() => setType(ContentType.Twitter)}
                            />
                            <ContentTypeButton
                                icon={<DocumentArrowUpIcon className="w-4 h-4" />}
                                label="PDF"
                                active={type === ContentType.Pdf}
                                onClick={() => setType(ContentType.Pdf)}
                            />
                            <ContentTypeButton
                                icon={<DocumentArrowUpIcon className="w-4 h-4" />}
                                label="DOCX"
                                active={type === ContentType.Docx}
                                onClick={() => setType(ContentType.Docx)}
                            />

                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <div className="">
                        <Button
                            onClick={addContent}
                            text={uploading ? "Uploading..." : "Submit"}
                            variant="primary"
                            disabled={uploading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ContentTypeButton({
    icon,
    label,
    active,
    onClick,
}: {
    icon: React.ReactNode;
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium border transition-all 
        ${active ? "bg-blue-600 text-white border-blue-700" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
        >
            {icon} {label}
        </button>
    );
}

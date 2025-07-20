import { useEffect } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { NoteIcon } from "../icons/NoteIcon";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { PdfIcon } from "../icons/PdfIcon";
import { DocxIcon } from "../icons/Docx";

interface CardProps {
  title: string;
  link: string;
  type: "tweet" | "youtube" | "pdf" | "docx" | "note";
  id?: string;
  onDelete?: () => void;
}

export function Card({ title, link, type, id, onDelete }: CardProps) {
  useEffect(() => {
    if (type === "tweet") {
      if (!(window as any).twttr) {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        document.body.appendChild(script);
      } else {
        (window as any).twttr.widgets.load();
      }
    }
  }, [type, link]);

  const getGoogleDocsViewerUrl = (link: string) => {
    return `https://docs.google.com/gview?url=${encodeURIComponent(link)}&embedded=true`;
  };

  const deleteContent = async () => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: {
          contentId: id,
        },
      });

      if (response.status === 200) {
        console.log("Deleted successfully");
        onDelete?.();
      }
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const getYoutubeEmbedUrl = (link: string) => {
    const match = link.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    const videoId = match?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  };

  return (
    <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out w-full max-w-[22rem] min-h-[16rem]">      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2 text-[15px] font-medium text-gray-700">
          <div className="text-[var(--purple-600)]">
            {type === "youtube" ? (
              <YoutubeIcon />
            ) : type === "tweet" ? (
              <TwitterIcon />
            ) : type === "note" ? (
              <span className="text-sm font-bold">
                <NoteIcon />
              </span>
            ) : type === "pdf" ? (
              <PdfIcon />
            ): type === "docx" ? (
              <DocxIcon />
            ): null}

          </div>
          <span className="truncate max-w-[10rem]">{title}</span>
        </div>

        <div className="flex items-center gap-3 text-gray-400 text-sm">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--purple-600)] transition-colors"
          >
            <ShareIcon />
          </a>
          <button
            onClick={deleteContent}
            className="hover:text-red-500 transition-colors"
          >
            <DeleteIcon />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mt-4">
        {type === "youtube" ? (
          <iframe
            className="w-full aspect-video rounded-md border"
            src={getYoutubeEmbedUrl(link)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : type === "tweet" ? (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")} />
          </blockquote>
        ) : type === "pdf" ? (
          <iframe
            src={link}
            title="PDF viewer"
            className="w-full h-64 rounded-md border"
          />
        ) : type === "docx" ? (
          <iframe
            src={getGoogleDocsViewerUrl(link)}
            title="DOCX viewer"
            className="w-full h-64 rounded-md border"
          />
        ) : type === "note" ? (
          <div className="bg-gray-100 p-4 rounded-md text-sm text-gray-700 whitespace-pre-wrap">
            {link}
          </div>
        ) : null}
      </div>
    </div>
  );
}
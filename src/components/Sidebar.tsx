import { useNavigate } from "react-router-dom";
import { Home } from "../icons/Home";
import { Logo } from "../icons/Logo";
import { PdfIcon } from "../icons/PdfIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { DocxIcon } from "../icons/Docx";
import {ChatHistoryIcon} from "../icons/ChatHistoryIcon";
import { NoteIcon } from "../icons/NoteIcon";

export function Sidebar({
  onFilterChange,
  activeFilter,
}: {
  onFilterChange: (type: string) => void;
  activeFilter: string;
}) {
  const navigate = useNavigate();
  return (
    <aside className="h-screen w-72 bg-white border-r shadow-sm fixed top-0 left-0 flex flex-col px-6 py-8">
      {/* Logo */}
      <div className="flex items-center gap-2 text-2xl font-bold text-[--purple-600]">
        <Logo />
        <span className="text-[var(--purple-600)]">Recalr</span>
      </div>

      {/* Nav Items */}
      <nav className="mt-10 flex flex-col gap-2 text-sm">
        <SidebarItem
          icon={<Home />}
          text="Home"
          active={activeFilter === "home"}
          onClick={() => onFilterChange("home")}  // ✅ change here
        />
        <SidebarItem
          icon={<TwitterIcon />}
          text="Twitter"
          active={activeFilter === "tweet"}
          onClick={() => onFilterChange("tweet")}
        />
        <SidebarItem
          icon={<YoutubeIcon />}
          text="YouTube"
          active={activeFilter === "youtube"}
          onClick={() => onFilterChange("youtube")}
        />
        <SidebarItem
          icon={<PdfIcon />}
          text="PDFs"
          active={activeFilter === "pdf"}
          onClick={() => onFilterChange("pdf")}
        />
        <SidebarItem
          icon={<DocxIcon/>}
          text="Docs"
          active={activeFilter === "docx"}
          onClick={() => onFilterChange("docx")}
        />
        <SidebarItem
          icon={<NoteIcon />} // ✅ new icon
          text="Notes"
          active={activeFilter === "note"}
          onClick={() => onFilterChange("note")} // ✅ filter type "note"
        />
        <SidebarItem
          icon={<ChatHistoryIcon/>}
          text="Chat History"
          active={activeFilter === "history"}
          onClick={() => onFilterChange("history")}
        />
      </nav>
    </aside>
  );
}
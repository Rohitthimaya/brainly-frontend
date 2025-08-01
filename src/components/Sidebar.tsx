// Sidebar.tsx
import { useNavigate } from "react-router-dom";
import { Home } from "../icons/Home";
import { Logo } from "../icons/Logo";
import { PdfIcon } from "../icons/PdfIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { DocxIcon } from "../icons/Docx";
import { ChatHistoryIcon } from "../icons/ChatHistoryIcon";
import { NoteIcon } from "../icons/NoteIcon";
import { X } from "lucide-react";

export function Sidebar({
  onFilterChange,
  activeFilter,
  isOpen,
  onClose,
}: {
  onFilterChange: (type: string) => void;
  activeFilter: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();

  return (
    <aside
      className={`
    fixed top-0 left-0 h-full
    w-[80%]           /*  80 % on phones  */
    sm:w-[70%]        /*    70 % on small tablets */
    md:w-1/4          /*    25 % on ≥ 768 px     */
    lg:w-1/5          /*    20 % on ≥ 1024 px    */
    bg-white z-50
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0 md:static md:block
  `}

    >
      {/* Close icon only for mobile */}
      <div className="md:hidden flex justify-end p-4">
        <button onClick={onClose}>
          <X className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      {/* Logo */}
      <div className="flex items-center gap-2 mt-4 text-2xl font-bold px-6 text-[--purple-600]">
        <Logo />
        <span className="text-[var(--purple-600)]">Recalr</span>
      </div>

      {/* Nav Items */}
      <nav className="mt-10 flex flex-col gap-2 text-sm px-6">
        <SidebarItem icon={<Home />} text="Home" active={activeFilter === "home"} onClick={() => { onFilterChange("home"); onClose(); }} />
        <SidebarItem icon={<TwitterIcon />} text="Twitter" active={activeFilter === "tweet"} onClick={() => { onFilterChange("tweet"); onClose(); }} />
        <SidebarItem icon={<YoutubeIcon />} text="YouTube" active={activeFilter === "youtube"} onClick={() => { onFilterChange("youtube"); onClose(); }} />
        <SidebarItem icon={<PdfIcon />} text="PDFs" active={activeFilter === "pdf"} onClick={() => { onFilterChange("pdf"); onClose(); }} />
        <SidebarItem icon={<DocxIcon />} text="Docs" active={activeFilter === "docx"} onClick={() => { onFilterChange("docx"); onClose(); }} />
        <SidebarItem icon={<NoteIcon />} text="Notes" active={activeFilter === "note"} onClick={() => { onFilterChange("note"); onClose(); }} />
        <SidebarItem icon={<ChatHistoryIcon />} text="Chat History" active={activeFilter === "history"} onClick={() => { onFilterChange("history"); onClose(); }} />
      </nav>
    </aside>
  );
}

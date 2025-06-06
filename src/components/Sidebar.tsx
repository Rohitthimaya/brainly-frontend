import { Home } from "../icons/Home";
import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar({
    onFilterChange,
    activeFilter
  }: {
    onFilterChange: (type: string) => void,
    activeFilter: string
  }) {
    return (
      <div className="h-screen bg-white border-r w-72 fixed absolute left-0 top-0 pl-6">
        <div className="flex text-2xl pt-8">
          <div className="pr-2 text-[var(--purple-600)]">
            <Logo />
          </div>
          Brainly
        </div>
        <div className="pt-8 pl-4">
        <SidebarItem
            icon={<Home />}
            text="Home"
            active={activeFilter === "all"}
            onClick={() => onFilterChange("all")}
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
        </div>
      </div>
    );
  }
  
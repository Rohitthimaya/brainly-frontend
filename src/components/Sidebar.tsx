import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
    return <div className="h-screen bg-white border-r w-72 fixed absolute left-0 top-0 pl-6">
        <div className="flex text-2xl pt-8">
            <div className="pr-2 text-[var(--purple-600)]">
                <Logo />
            </div>
            Brainly
        </div>
        <div className="pt-8 pl-4">
            <SidebarItem icon={<TwitterIcon />} text="Twitter"/>
            <SidebarItem icon={<YoutubeIcon />} text="YouTube"/> 
        </div>
    </div>
}
import { ReactElement } from "react";

// export function SidebarItem({ text, icon }: { text: string; icon: ReactElement }) {
//     return <div className="flex text-gray-700 py-2 cursor-pointer hover:bg-gray-200 rounded max-w-48 pl-4 transition-all duration-150">
//         <div className="pr-2">
//             {icon}</div> 
//         <div>{text}</div>
//     </div>
// }

export function SidebarItem({
    icon,
    text,
    onClick,
    active = false
  }: {
    icon: ReactElement,
    text: string,
    onClick?: () => void,
    active?: boolean
  }) {
    return (
      <div
        className={`flex items-center gap-2 py-2 cursor-pointer 
          ${active ? 'text-[var(--purple-600)]' : 'text-gray-800'} 
          hover:text-[var(--purple-600)]`}
        onClick={onClick}
      >
        <div>{icon}</div>
        <div>{text}</div>
      </div>
    );
  }
  
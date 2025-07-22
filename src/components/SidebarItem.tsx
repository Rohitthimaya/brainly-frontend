import { ReactElement } from "react";

export function SidebarItem({
  icon,
  text,
  onClick,
  active = false,
}: {
  icon: ReactElement;
  text: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer transition-colors 
        ${active
          ? "bg-[var(--purple-200)] text-[var(--purple-600)]"
          : "text-gray-700 hover:bg-gray-100 hover:text-[var(--purple-600)]"
        }`}
      onClick={onClick}
    >
      <div className="w-6 h-6">{icon}</div>
      <span className="text-sm font-medium">{text}</span>

    </div>
  );
}
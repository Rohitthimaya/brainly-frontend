import { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary";
    text: string;
    startIcon: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
    loading?: boolean
}


const variantClasses = {
    "primary": "bg-[var(--purple-600)] text-white",
    "secondary": "bg-[var(--purple-200)] text-[var(--purple-600)]"
};

const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center cursor-pointer"

export const Button = ({ variant, text, startIcon, onClick, fullWidth, loading }: ButtonProps) => {
    return (
        <button onClick={onClick} className={variantClasses[variant] + " " + defaultStyles + `${fullWidth ? " w-full flex justify-center items-center" : ""} ${loading ? "opacity-45": ""}`} disabled={loading}>
            <div className="pr-2">
                {startIcon}
            </div>
            {text}
        </button>
    )
}
import{ ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary";
    text: string;
    startIcon: ReactElement;
}
const variantClasses = {
    "primary": "bg-[var(--purple-600)] text-white",
    "secondary": "bg-[var(--purple-200)] text-[var(--purple-600)]"
};

const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center"

export const Button = ({ variant, text, startIcon }: ButtonProps) => {
    return (
        <>
            <button className={variantClasses[variant] + " " + defaultStyles} >
                <div className="pr-1">
                    {startIcon}
                </div>
                {text}
            </button>
        </>
    )
}
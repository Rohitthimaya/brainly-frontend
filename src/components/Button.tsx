import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: ReactElement;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

const variantClasses: Record<string, string> = {
  primary: "bg-[var(--purple-600)] text-white hover:bg-[var(--purple-500)] focus:ring-[var(--purple-300)]",
  secondary: "bg-[var(--purple-200)] text-[var(--purple-600)] hover:bg-[var(--purple-100)] focus:ring-[var(--purple-300)]",
};

export const Button = ({
  variant = "primary",
  text,
  startIcon,
  onClick,
  fullWidth = false,
  loading = false,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className={`
        inline-flex items-center justify-center gap-2 
        px-4 py-2 rounded-md text-sm font-medium 
        transition-all duration-200 ease-in-out
        shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1
        disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
        ${variantClasses[variant]}
        ${fullWidth ? "w-full" : ""}
      `}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
      )}
      {!loading && startIcon && <div className="w-5 h-5">{startIcon}</div>}
      <span>{text}</span>
    </button>
  );
};
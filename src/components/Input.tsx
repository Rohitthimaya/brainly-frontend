interface InputProps {
    placeholder: string;
    reference?: React.RefObject<HTMLInputElement | null>;
    type?: string;
    id?: string;
    label?: string;
  }
  
  export function Input({ placeholder, reference, type = "text", id, label }: InputProps) {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-gray-600">
            {label}
          </label>
        )}
        <input
          ref={reference}
          type={type}
          placeholder={placeholder}
          id={id}
          className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-150"
          aria-label={label || placeholder}
        />
      </div>
    );
  }
  
export function ChatHistoryIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        {/* Chat bubble outline */}
        <path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7l-4 4V6a2 2 0 0 1 2-2z" />
  
        {/* Inner lines for message history */}
        <path
          fill="#ffffff"
          d="M7 8h10v1H7V8zm0 3h7v1H7v-1zm0 3h5v1H7v-1z"
        />
      </svg>
    );
  }
  
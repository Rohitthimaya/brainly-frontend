export function DocxIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      {/* Outer document shape */}
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />

      {/* Inner horizontal lines to represent text content */}
      <path
        fill="#ffffff"
        d="M7 10h10v1H7v-1zm0 3h10v1H7v-1zm0 3h6v1H7v-1z"
      />
    </svg>
  );
}

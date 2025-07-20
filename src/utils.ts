
export function timeAgo(date: Date): string {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // in seconds
  
    if (diff < 60) return `${diff} second${diff !== 1 ? "s" : ""} ago`;
    const mins = Math.floor(diff / 60);
    if (mins < 60) return `${mins} minute${mins !== 1 ? "s" : ""} ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hour${hrs !== 1 ? "s" : ""} ago`;
    const days = Math.floor(hrs / 24);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }
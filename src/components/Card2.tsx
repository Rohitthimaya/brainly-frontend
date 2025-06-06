import { useEffect } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";

interface CardProps {
    title: string;
    link: string;
    type: "tweet" | "youtube";
}

export function Card2({ title, link, type}: CardProps) {
    useEffect(() => {
        if (type === "tweet") {
            // Load Twitter script if not already loaded
            if (!(window as any).twttr) {
                const script = document.createElement("script");
                script.src = "https://platform.twitter.com/widgets.js";
                script.async = true;
                document.body.appendChild(script);
            } else {
                (window as any).twttr.widgets.load();
            }
        }
    }, [type, link]);

    

    return (
        <div className="p-4 bg-white rounded-md border-gray-200 max-w-72 border min-h-48 min-w-72">
            <div className="flex justify-between">
                <div className="flex items-center text-md">
                    <div className="text-gray-500 pr-2">
                        {type == "youtube" ? <YoutubeIcon/> : <TwitterIcon />}
                    </div>
                    {title}
                </div>
                <div className="flex items-center gap-3">
                    <div className="pr2 text-gray-500">
                        <a href={link} target="_blank" rel="noopener noreferrer">
                            <ShareIcon />
                        </a>
                    </div>
                </div>
            </div>
            <div className="pt-4">
                {type === "youtube" ? (
                    <iframe
                        className="w-full"
                        src={link.replace("watch", "embed").replace("?v=", "/")}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <blockquote className="twitter-tweet">
                        <a href={link.replace("x.com", "twitter.com")}></a>
                    </blockquote>
                )}
            </div>
        </div>
    );
}

import React from "react";
import { Heart } from "react-feather";

interface HeartIconProps {
    index: number; // La posición del corazón (1-5)
    loveLevel: number; // El nivel de "amor" (e.g., 3.5)
}

function HeartIcon({ index, loveLevel }: HeartIconProps) {
    let fillColor = "transparent";
    let gradient = false;

    if (index <= loveLevel) {
        fillColor = "red";
    } else if (index - 0.5 === loveLevel) {
        gradient = true;
    }

    return (
        <div className="heart-icon">
            <svg width="0" height="0">
                {gradient && (
                    <linearGradient id={`half-${index}`} x1="0%" y1="50%" x2="100%" y2="50%">
                        <stop stopColor="red" offset="50%" />
                        <stop stopColor="transparent" offset="50%" />
                    </linearGradient>
                )}
            </svg>
            <Heart style={{stroke: "rgba(var(--text))", fill: gradient? `url(#half-${index}` : fillColor}} strokeWidth="1" />
        </div>
    );
}

export default HeartIcon;

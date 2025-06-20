import React from "react";

interface Props {
  className?: string;
}

export const VolumeMax = ({ className = "" }: Props) => {
  return (
    <svg
      className={className}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 4.702a.705.705 0 0 0-1.203-.498L5.418 8.582A.7.7 0 0 0 5.42 8.58l-.002.002H3.7a.7.7 0 0 0-.7.7v5.436a.7.7 0 0 0 .7.7h1.717l.002.002a.7.7 0 0 0-.002-.002l4.379 4.378A.705.705 0 0 0 11 19.298V4.702Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
      <path
        d="M15.54 15.54a5 5 0 0 0 0-7.08M18.364 18.364a9 9 0 0 0 0-12.728"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}; 
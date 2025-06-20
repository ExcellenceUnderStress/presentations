/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";

interface Props {
  className: string;
}

export const StyleOutlineStateDefault = ({ className }: Props) => {
  return (
    <svg
      className={`${className}`}
      fill="none"
      height="80"
      viewBox="0 0 80 80"
      width="80"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        height="77"
        rx="38.5"
        stroke="white"
        strokeWidth="3"
        width="77"
        x="1.5"
        y="1.5"
      />

      <path
        d="M56.25 37.904C57.9167 38.8355 57.9167 41.1645 56.25 42.096L33.75 54.6721C32.0833 55.6037 30 54.4392 30 52.5761L30 27.4239C30 25.5608 32.0833 24.3963 33.75 25.3279L56.25 37.904Z"
        fill="white"
      />
    </svg>
  );
};

import React from "react";
import { useReducer } from "react";
import { StyleOutlineStateDefault } from "../../src/app/icons/StyleOutlineStateDefault";
import { StyleOutlineStateHover } from "../../src/app/icons/StyleOutlineStateHover";

interface Props {
  style: "outline" | "glassmorphism";
  stateProp: "hover" | "default";
  styleGlassmorphismClassName: string;
  onClick?: () => void;
}

interface State {
  style: "outline" | "glassmorphism";
  state: "hover" | "default";
}

type Action = "mouse_enter" | "mouse_leave";

export const PlayButton = ({
  style,
  stateProp,
  styleGlassmorphismClassName,
  onClick,
}: Props) => {
  const [state, dispatch] = useReducer(reducer, {
    style: style || "glassmorphism",
    state: stateProp || "default",
  });

  return (
    <>
      {state.style === "glassmorphism" && (
        <div
          className={`w-20 bg-[100%_100%] h-20 [-webkit-backdrop-filter:blur(8px)_brightness(100%)] backdrop-blur backdrop-brightness-[100%] ${state.state === "hover" ? "bg-[url(/img/button-1.svg)]" : "bg-[url(/img/button.svg)]"} ${styleGlassmorphismClassName} cursor-pointer`}
          onMouseLeave={() => {
            dispatch("mouse_leave");
          }}
          onMouseEnter={() => {
            dispatch("mouse_enter");
          }}
          onClick={onClick}
        />
      )}

      {state.state === "default" && state.style === "outline" && (
        <StyleOutlineStateDefault className="!absolute !w-20 !h-20 !top-0 !left-0" />
      )}

      {state.style === "outline" && state.state === "hover" && (
        <StyleOutlineStateHover className="!absolute !w-20 !h-20 !top-0 !left-0" />
      )}
    </>
  );
};

function reducer(state: State, action: Action): State {
  switch (action) {
    case "mouse_enter":
      return {
        ...state,
        state: "hover",
      };

    case "mouse_leave":
      return {
        ...state,
        state: "default",
      };
  }

  return state;
}
// PropTypes removed - using TypeScript interface instead


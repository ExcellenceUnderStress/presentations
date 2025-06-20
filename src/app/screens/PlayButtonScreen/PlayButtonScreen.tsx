import React from "react";
import { PlayButton } from "../../../../components/PlayButton";

interface Props {
  className?: string;
}

export const PlayButtonScreen = ({ className }: Props) => {

  return (
    <PlayButton
      stateProp="default"
      style="glassmorphism"
      styleGlassmorphismClassName="!h-32 bg-[url(/img/button-2.svg)] ![-webkit-backdrop-filter:unset] ![backdrop-filter:unset] !w-32"
    />
  );
};

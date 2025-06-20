import React from "react";

// BlurCard component placeholder - this seems to be a demo file
const BlurCard = ({ className, supportingTextClassName, text, text1, textClassName }: any) => (
  <div className={`p-4 rounded-lg ${className || ''}`}>
    <div className={textClassName}>Sample {text || 'light'} text</div>
    <div className={supportingTextClassName}>Supporting text</div>
    <div>{text1}</div>
  </div>
);

export const Section = () => {
  return (
    <div className="flex flex-col items-start p-20 relative">
      <div className="flex-wrap gap-[64px_64px] p-20 self-stretch w-full flex-[0_0_auto] rounded-2xl bg-[url(/blur-background.png)] bg-cover bg-[50%_50%] flex items-start relative overflow-hidden backdrop-blur-sm backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(4px)_brightness(100%)]">
        <BlurCard className="!flex-1 !grow" />
        <BlurCard
          className="!flex-1 !bg-[#00000099] !grow"
          supportingTextClassName="!text-basewhite"
          text="dark"
          textClassName="!text-basewhite"
        />
        <BlurCard
          className="!flex-1 !grow ![-webkit-backdrop-filter:blur(8px)_brightness(100%)] !backdrop-blur !backdrop-brightness-[100%]"
          text="light"
          text1="backdrop-blur-md"
        />
        <BlurCard
          className="!flex-1 !bg-[#00000099] !grow ![-webkit-backdrop-filter:blur(8px)_brightness(100%)] !backdrop-blur !backdrop-brightness-[100%]"
          supportingTextClassName="!text-basewhite"
          text="dark"
          text1="backdrop-blur-md"
          textClassName="!text-basewhite"
        />
        <BlurCard
          className="!flex-1 !grow ![-webkit-backdrop-filter:blur(12px)_brightness(100%)] !backdrop-blur-md !backdrop-brightness-[100%]"
          text="light"
          text1="backdrop-blur-lg"
        />
        <BlurCard
          className="!flex-1 !bg-[#00000099] !grow ![-webkit-backdrop-filter:blur(12px)_brightness(100%)] !backdrop-blur-md !backdrop-brightness-[100%]"
          supportingTextClassName="!text-basewhite"
          text="dark"
          text1="backdrop-blur-lg"
          textClassName="!text-basewhite"
        />
        <BlurCard
          className="!flex-1 !grow ![-webkit-backdrop-filter:blur(20px)_brightness(100%)] !backdrop-blur-[20px] !backdrop-brightness-[100%]"
          text="light"
          text1="backdrop-blur-xl"
        />
        <BlurCard
          className="!flex-1 !bg-[#00000099] !grow ![-webkit-backdrop-filter:blur(20px)_brightness(100%)] !backdrop-blur-[20px] !backdrop-brightness-[100%]"
          supportingTextClassName="!text-basewhite"
          text="dark"
          text1="backdrop-blur-xl"
          textClassName="!text-basewhite"
        />
      </div>
    </div>
  );
};

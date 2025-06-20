import React from "react";
import series12 from "./series-1-2.svg";
import series13 from "./series-1-3.svg";
import series14 from "./series-1-4.svg";
import series1 from "./series-1.svg";
import series22 from "./series-2-2.svg";
import series23 from "./series-2-3.svg";
import series24 from "./series-2-4.svg";
import series2 from "./series-2.svg";
import series32 from "./series-3-2.svg";
import series33 from "./series-3-3.svg";
import series34 from "./series-3-4.svg";
import series3 from "./series-3.svg";
import series42 from "./series-4-2.svg";
import series43 from "./series-4-3.svg";
import series44 from "./series-4-4.svg";
import series4 from "./series-4.svg";
import series52 from "./series-5-2.svg";
import series53 from "./series-5-3.svg";
import series54 from "./series-5-4.svg";
import series5 from "./series-5.svg";
import series62 from "./series-6-2.svg";
import series63 from "./series-6-3.svg";
import series64 from "./series-6-4.svg";
import series6 from "./series-6.svg";

interface Props {
  hole: "fifty" | "false" | "twenty-five" | "seventy-five";
  className?: string;
}

export const PieChart = ({ hole, className }: Props): React.JSX.Element => {
  return (
    <div
      className={`w-40 h-40 ${["fifty", "seventy-five", "twenty-five"].includes(hole) ? "bg-cover" : ""} ${hole === "twenty-five" ? "bg-[url(/background-2.svg)]" : (hole === "fifty") ? "bg-[url(/image.svg)]" : hole === "seventy-five" ? "bg-[url(/background.svg)]" : ""} ${hole === "false" ? "rounded-[80px]" : ""} ${["fifty", "seventy-five", "twenty-five"].includes(hole) ? "bg-[50%_50%]" : ""} ${hole === "false" ? "bg-gray-200" : ""} ${className}`}
    >
      <div className="h-40 relative">
        <img
          className={`w-[76px] left-20 top-0 object-cover absolute ${hole === "twenty-five" ? "h-[74px]" : (hole === "fifty") ? "h-[68px]" : hole === "seventy-five" ? "h-[61px]" : "h-20"}`}
          alt="Series"
          src={
            hole === "twenty-five"
              ? series13
              : hole === "fifty"
                ? series12
                : hole === "seventy-five"
                  ? series1
                  : series14
          }
        />

        <img
          className="w-[105px] left-[55px] top-[55px] object-cover h-[105px] absolute"
          alt="Series"
          src={
            hole === "twenty-five"
              ? series23
              : hole === "fifty"
                ? series22
                : hole === "seventy-five"
                  ? series2
                  : series24
          }
        />

        <img
          className={`left-[15px] object-cover absolute ${hole === "twenty-five" ? "w-[59px]" : (hole === "fifty") ? "w-[52px]" : hole === "seventy-five" ? "w-[46px]" : "w-[65px]"} ${hole === "twenty-five" ? "top-[92px]" : (hole === "fifty") ? "top-[104px]" : hole === "seventy-five" ? "top-[115px]" : "top-20"} ${hole === "twenty-five" ? "h-16" : (hole === "fifty") ? "h-[53px]" : hole === "seventy-five" ? "h-[41px]" : "h-[76px]"}`}
          alt="Series"
          src={
            hole === "twenty-five"
              ? series33
              : hole === "fifty"
                ? series32
                : hole === "seventy-five"
                  ? series3
                  : series34
          }
        />

        <img
          className={`left-0 top-[70px] object-cover h-[57px] absolute ${hole === "twenty-five" ? "w-16" : (hole === "fifty") ? "w-12" : hole === "seventy-five" ? "w-[31px]" : "w-20"}`}
          alt="Series"
          src={
            hole === "twenty-five"
              ? series43
              : hole === "fifty"
                ? series42
                : hole === "seventy-five"
                  ? series4
                  : series44
          }
        />

        <img
          className={`left-px top-1 object-cover absolute ${hole === "twenty-five" ? "w-[73px]" : (hole === "fifty") ? "w-[67px]" : hole === "seventy-five" ? "w-[61px]" : "w-[79px]"} ${hole === "twenty-five" ? "h-[74px]" : (hole === "fifty") ? "h-[71px]" : hole === "seventy-five" ? "h-[69px]" : "h-[76px]"}`}
          alt="Series"
          src={
            hole === "twenty-five"
              ? series53
              : hole === "fifty"
                ? series52
                : hole === "seventy-five"
                  ? series5
                  : series54
          }
        />

        <img
          className={`w-[26px] left-[55px] top-0 object-cover absolute ${hole === "twenty-five" ? "h-[61px]" : (hole === "fifty") ? "h-[42px]" : hole === "seventy-five" ? "h-[23px]" : "h-20"}`}
          alt="Series"
          src={
            hole === "twenty-five"
              ? series63
              : hole === "fifty"
                ? series62
                : hole === "seventy-five"
                  ? series6
                  : series64
          }
        />
      </div>
    </div>
  );
};

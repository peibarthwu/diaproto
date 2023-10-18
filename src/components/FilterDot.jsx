import { useState, useEffect, useRef } from "react";

const FilterDot = (props) => {
  const year = props.year;

  const [curColor, setCurColor] = useState("white");

  const onMouseEnter = () => {
    setCurColor("red");
  };

  const onMouseLeave = () => {
    setCurColor("white");
  };

  return (
    <div
      className={`w-[12px] h-[12px] rounded-full border-[#959BA2] border-[1.5px] bg-white z-1000 absolute`}
      style={{ backgroundColor: curColor }}
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={() => onMouseLeave()}
    ></div>
  );
};
export default FilterDot;

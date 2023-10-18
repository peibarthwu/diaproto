import { useState, useEffect, useRef } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";

const HorizontalSection = (props) => {
  return (
    <ScrollContainer className="scroll-container flex flex-row h-screen w-screen bg-inherit">
      {props.entries.map((entry, j) => {
        return (
          <div
            className="w-screen h-screen shrink-0 flex justify-center items-center text-3xl"
            key={j}
          >
            {entry.title}
          </div>
        );
      })}
    </ScrollContainer>
  );
};
export default HorizontalSection;

import { useState, useEffect, useRef } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin); // (or in the top-level file in your React app)

const HorizontalSection = (props) => {
  const containerRef = useRef(null);
  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);

  useEffect(() => {
    let curEntry = 0;
    const $entries = containerRef.current.querySelectorAll(".entry");

    //add correct padding
    const lasEntry = $entries[$entries.length - 1];
    const lastEntryWidth = lasEntry.getBoundingClientRect().width;
    lasEntry.style.marginRight = `${window.innerWidth - lastEntryWidth}px`;

    const getCurrEntry = (entries) => {
      let prevLeft = 0;
      for (let i = 0; i < entries.length; i++) {
        const left = entries[i].getBoundingClientRect().left;
        if (left == 0) {
          return i;
        }
        if (left > 0 && left > prevLeft) {
          return i;
        } else {
          prevLeft = left;
        }
      }
      return entries.length - 1;
    };

    const updateEntry = (entries) => {
      const entryIdx = getCurrEntry(entries);
      curEntry = entryIdx;
    };

    const getNextEntry = (leftArrow) => {
      let idx = curEntry;
      if (leftArrow) {
        let newIdx = curEntry - 1;
        idx = newIdx >= 0 ? newIdx : 0;
      } else {
        let newIdx = curEntry + 1;
        idx = newIdx < props.entries.length ? newIdx : props.entries.length - 1;
        console.log({ newIdx });
        console.log({ idx });
      }
      curEntry = idx;
      return idx;
    };

    gsap.to($entries, {
      ease: "none",
      scrollTrigger: {
        trigger: ".scroll-container",
        scrub: 0.5,
      },
    });

    leftArrowRef.current.addEventListener("click", () => {
      updateEntry($entries);
      let nextEntry = getNextEntry(true);
      console.log({ nextEntry });
      gsap.to(containerRef.current, {
        scrollTo: $entries[nextEntry],
        overwrite: "auto",
        duration: 1,
      });
    });

    rightArrowRef.current.addEventListener("click", () => {
      updateEntry($entries);
      let nextEntry = getNextEntry(false);
      console.log({ nextEntry });

      gsap.to(containerRef.current, {
        scrollTo: $entries[nextEntry],
        overwrite: "auto",
        duration: 1,
      });
    });
  }, []);
  return (
    <div className="relative h-screen w-screen">
      <ScrollContainer
        className="scroll-container flex flex-row h-screen w-screen bg-inherit"
        ref={containerRef}
      >
        {props.entries.map((entry, i) => {
          return (
            <div
              className="entry w-[680px] h-screen shrink-0 flex justify-center items-center text-3xl"
              key={i}
              style={{
                backgroundColor: `${i % 2 ? "#555555" : "white"}`,
                color: `${i % 2 ? "#ffffff" : "#555555"}`,
              }}
            >
              {entry.title}
            </div>
          );
        })}
        <div className="absolute left-0 md:right-0 md:left-auto bottom-0 flex flex-row p-8">
          <img src="Arrow_Left.svg" className="p-2" ref={leftArrowRef}></img>
          <img src="Arrow_Right.svg" className="p-2" ref={rightArrowRef}></img>
        </div>
      </ScrollContainer>
    </div>
  );
};
export default HorizontalSection;

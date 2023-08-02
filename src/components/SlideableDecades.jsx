import React from "react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import Collapsible from "react-collapsible";

const SlideableDecades = () => {
  const handlerRef = useRef(null);
  const labelTextRef = useRef(null);
  const seventy = useRef(null);
  const eighty = useRef(null);
  const ninety = useRef(null);
  const twothousand = useRef(null);
  const ten = useRef(null);
  const twenty = useRef(null);

  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(Draggable);
  const yearInterval = 1;
  const startYear = 1983;
  const endYear = 2024;
  const numDecades = 5;

  useEffect(() => {
    let handler = seventy.current,
      barLength,
      maxScroll,
      trigger,
      draggable;
    console.log(handler);

    // this ScrollTrigger will use the window/<body> by default, calling onRefresh when the page resizes, and onUpdate whenever any scroll happens.
    trigger = ScrollTrigger.create({
      onRefresh: onResize,
      onUpdate: updateHandler,
      markers: true,
    });

    draggable = Draggable.create(handler, {
      type: "x",
    //   bounds: ".bar",
      onDrag: function () {
        trigger.scroll((this.x / barLength) * maxScroll); // when dragging, scroll the page to the corresponding ratio
        console.log("draggin")
      },
    })[0];

    function onResize() {
      if (trigger) {
        maxScroll = ScrollTrigger.maxScroll(window); // record the maximum scroll value for the page
        barLength =
          handler.offsetWidth - document.querySelector(".bar").offsetWidth;
        updateHandler();
      }
    }
    onResize();

    function setText(y) {
      const percent = y / window.innerWidth;
      labelTextRef.current.innerHTML =
        startYear + Math.round((endYear - startYear) * percent);
    }

    function updateHandler() {
      // move the handler to the corresponding ratio according to the page's scroll position.
      const percent = (trigger.scroll() / maxScroll) * 100;

      const newX =
        -(barLength - handler.offsetWidth * trigger.scroll()) / maxScroll;
      //setText(newX);
      if (percent < 20) {
        const calcX =
          -(barLength - handler.offsetWidth * trigger.scroll()) /
          (maxScroll / 5);
        gsap.set(seventy.current, { x: calcX });
      } else if (percent < 40) {
        const calcX =
          -(
            barLength -
            handler.offsetWidth * (trigger.scroll() - maxScroll / 5)
          ) /
          (maxScroll / 5);
        gsap.set(eighty.current, { x: calcX });
      } else if (percent < 60) {
        const calcX =
          -(barLength - handler.offsetWidth * trigger.scroll()) /
          ((3 * maxScroll) / 5);
        gsap.set(ninety.current, { x: calcX });
      } else if (percent < 80) {
        const calcX =
          -(barLength - handler.offsetWidth * trigger.scroll()) /
          ((4 * maxScroll) / 5);
        gsap.set(twothousand.current, { x: calcX });
      } else if (percent < 100) {
        const calcX =
          -(barLength - handler.offsetWidth * trigger.scroll()) /
          ((5 * maxScroll) / 5);
        gsap.set(ten.current, { x: calcX });
      } else {
        gsap.set(twenty.current, { x: newX });
      }
    }
  }, []);

  return (
    <div className="flex flex-col w-screen min-h-screen justify-evenly">
      <div trigger="Start here" className="bar bg-[#959BA2] my-[20px] h-[2px]">
        <div id="handler" ref={seventy} className="relative z-1  -top-[9px]">
          <div className="slider w-[20px] h-[20px] rounded-full bg-[#959BA2]"></div>
          <span
            className="absolute text-left top-[25px] left-0"
            ref={labelTextRef}
          >
            1974
          </span>
        </div>
      </div>
      <Collapsible trigger="1970">
        imagine there is a ton of content here for the entire decade ?
        <img src="./dia.png" className="w-full"/>
      </Collapsible>
      <div className="bg-[#959BA2] my-[20px] h-[2px]">
        <div id="handler" ref={eighty} className="relative z-1  -top-[9px]">
          <div className="hidden w-[20px] h-[20px] rounded-full bg-[#959BA2]"></div>
          <span
            className="absolute text-left top-[25px] left-0"
            ref={labelTextRef}
          >
            1980
          </span>
        </div>
      </div>
      <Collapsible trigger="1980">
        imagine there is a ton of content here for the entire decade ?
      </Collapsible>
      <div className="bg-[#959BA2] my-[20px] h-[2px]">
        <div id="handler" ref={ninety} className="relative z-1  -top-[9px]">
          <div className="hidden w-[20px] h-[20px] rounded-full bg-[#959BA2]"></div>
          <span
            className="absolute text-left top-[25px] left-0"
            ref={labelTextRef}
          >
            1990
          </span>
        </div>
      </div>
      <Collapsible trigger="1990">
        imagine there is a ton of content here for the entire decade ?
      </Collapsible>
      <div className="bg-[#959BA2] my-[20px] h-[2px]">
        <div
          id="handler"
          ref={twothousand}
          className="relative z-1  -top-[9px]"
        >
          <div className="hidden w-[20px] h-[20px] rounded-full bg-[#959BA2]"></div>
          <span
            className="absolute text-left top-[25px] left-0"
            ref={labelTextRef}
          >
            2000{" "}
          </span>
        </div>
      </div>
      <Collapsible trigger="2000">
        imagine there is a ton of content here for the entire decade ?
      </Collapsible>
      <div className="bg-[#959BA2] my-[20px] h-[2px]">
        <div id="handler" ref={ten} className="relative z-1  -top-[9px]">
          <div className="hidden w-[20px] h-[20px] rounded-full bg-[#959BA2]"></div>
          <span
            className="absolute text-left top-[25px] left-0"
            ref={labelTextRef}
          >
            2010
          </span>
        </div>
      </div>
      <Collapsible trigger="2010">
        imagine there is a ton of content here for the entire decade ?
      </Collapsible>
      <div className="bg-[#959BA2] my-[20px] h-[2px]">
        <div id="handler" ref={twenty} className="relative z-1  -top-[9px]">
          <div className="hidden w-[20px] h-[20px] rounded-full bg-[#959BA2]"></div>
          <span
            className="absolute text-left top-[25px] left-0"
            ref={labelTextRef}
          >
            2020
          </span>
        </div>
      </div>
      <Collapsible trigger="2020">
        imagine there is a ton of content here for the entire decade ?
      </Collapsible>
    </div>
  );
};

export default SlideableDecades;

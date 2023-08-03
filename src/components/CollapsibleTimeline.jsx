import React from "react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

const CollapsibleTimeline = () => {
  const handlerRef = useRef(null);
  const labelTextRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(Draggable);
  const yearInterval = 1;
  const startYear = 1983;
  const endYear = 2024;

  useEffect(() => {
    let handler = handlerRef.current,
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
      type: "y",
      bounds: ".bar",
      onDrag: function () {
        trigger.scroll((this.y / barLength) * maxScroll); // when dragging, scroll the page to the corresponding ratio
      },
    })[0];

    function onResize() {
      if (trigger) {
        maxScroll = ScrollTrigger.maxScroll(window); // record the maximum scroll value for the page
        barLength =
          document.querySelector(".bar").offsetHeight - handler.offsetHeight;
        updateHandler();
      }
    }
    onResize();

    function setText(y) {
      const percent = y / window.innerHeight;
      labelTextRef.current.innerHTML =
        startYear + Math.round((endYear - startYear) * percent);
    }

    function updateHandler() {
      // move the handler to the corresponding ratio according to the page's scroll position.
      const newY = (barLength * trigger.scroll()) / maxScroll;
      setText(newY);
      gsap.set(handler, { y: newY });
    }
  }, []);

  return (
    <>
      <div className="bar bg-[#959BA2] mx-[20px] w-[2px] fixed top-0 left-0 bottom-0">
        <div
          id="handler"
          ref={handlerRef}
          className="relative z-1  -left-[9px]"
        >
          <div className="w-[20px] h-[20px] rounded-full bg-[#959BA2]"></div>
          <span className="absolute top-0 left-[25px]" ref={labelTextRef}>
            {startYear}
          </span>
        </div>
      </div>
      
    </>
  );
};

export default CollapsibleTimeline;

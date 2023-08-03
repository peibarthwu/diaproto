import React from "react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

const HorizontalDrag = (props) => {

  const handlerRef = useRef(null);
  const labelTextRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(Draggable);
  const yearInterval = 1;
  const startYear = props.date ? props.date : 1970;
  const endYear = startYear + 9;

  useEffect(() => {
    let handler = handlerRef.current,
      barLength,
      maxScroll,
      trigger,
      draggable;
    console.log(handler);

    // this ScrollTrigger will use the window/<body> by default, calling onRefresh when the page resizes, and onUpdate whenever any scroll happens.
    // trigger = ScrollTrigger.create({
    //   onRefresh: onResize,
    //   onUpdate: updateHandler,
    //   markers: true,
    // });

    draggable = Draggable.create(handler, {
      type: "x",
      bounds: {minX:0,maxX: handler.offsetWidth - 20},
      onDrag: function () {
        setText(this.x)
        // trigger.scroll((this.x / barLength) * maxScroll); // when dragging, scroll the page to the corresponding ratio
      },
    })[0];
    console.log(draggable.maxX)

    function onResize() {
        if (trigger) {
          maxScroll = ScrollTrigger.maxScroll(window); // record the maximum scroll value for the page
          barLength =
            (handler.offsetWidth - document.querySelector(".bar").offsetWidth -20);
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
      const newX = (barLength * trigger.scroll()) / maxScroll;
      setText(newX);
      gsap.set(handler, { x: newX });
    }
  }, []);

  return (
    <div className="relative">
      <div className="bar bg-[#959BA2] h-[2px] absolute top-0 left-0 right-0">
        <div
          id="handler"
          ref={handlerRef}
          className="relative z-1  -top-[9px]"
        >
          <div className="w-[20px] h-[20px] rounded-full bg-[#959BA2]"></div>
          <span className="absolute left-0 top-[20px]" ref={labelTextRef}>
            {startYear}
        </span>
        </div>
       
      </div>
    </div>
  );
};

export default HorizontalDrag;

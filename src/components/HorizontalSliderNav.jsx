import React from "react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

const SliderNav = () => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(Draggable);

  useEffect(() => {
    let handler = document.querySelector("#handler"),
      barLength,
      maxScroll,
      trigger,
      draggable;
      console.log(handler)

    // this ScrollTrigger will use the window/<body> by default, calling onRefresh when the page resizes, and onUpdate whenever any scroll happens.
    trigger = ScrollTrigger.create({
      onRefresh: onResize,
      onUpdate: updateHandler,
      markers: true,
    });

    draggable = Draggable.create(handler, {
      type: "x",
      bounds: ".bar",
      onDrag: function () {
        console.log(window.scrollY)
        trigger.scroll((this.x / barLength) * maxScroll); // when dragging, scroll the page to the corresponding ratio
        console.log(trigger)
      },
    })[0];

    function onResize() {
      if (trigger) {
        maxScroll = ScrollTrigger.maxScroll(window); // record the maximum scroll value for the page
        barLength =
          document.querySelector(".bar").offsetWidth - handler.offsetWidth;
        updateHandler();
      }
    }

    onResize();
    function updateHandler() {
      // move the handler to the corresponding ratio according to the page's scroll position.
      gsap.set(handler, { x: (barLength * trigger.scroll()) / maxScroll });
      console.log(barLength)
    }
  }, []);

  return (
    <>
      <div className="bar bg-[#ff0000] mx-[20px] w-[2px]  fixed top-0 left-0 right-0">
        <div
          id="handler"
          className="w-[20px] h-[20px] rounded-full bg-[#000000] relative z-1"
        ></div>
      </div>
      <div className="h-[10000px]"></div>
    </>
  );
};

export default SliderNav;

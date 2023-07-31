import React from "react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

const DraggableNav = () => {
  gsap.registerPlugin(Draggable);

  useEffect(() => {


    Draggable.create(".top-slider", {
        type:"y",
        bounds: {top: 0, left: 0, width:window.innerWidth, height: window.innerHeight},
        inertia: true,
        onClick: function() {
            console.log("clicked");
        },
        onDrag: function() {
            const newBottom = document.querySelector(".bottom-slider").getBoundingClientRect().top
            this.applyBounds({top: 0, left: 0, width:window.innerWidth, height: newBottom})
        }
    });

    Draggable.create(".bottom-slider", {
        type:"y",
        // bounds: document.querySelector(".container"),
        bounds: {top: 0, left: 0, width:window.innerWidth, height: window.innerHeight},
        inertia: true,
        onClick: function() {
            console.log("clicked");

        },
        onDrag: function() {
            const newTop = document.querySelector(".top-slider").getBoundingClientRect().bottom
            this.applyBounds({top: newTop, left: 0, width:window.innerWidth, height: window.innerHeight-newTop})
        }
    });
    return () => {};
  }, []);


  return (
    <>
    <div className="w-full h-full absolute container top-0 left-0">
    <div className="w-[3px] bg-[#959BA2] h-screen fixed left-[150px] top-0"></div>
      <div className="top-slider fixed top-0 left-[141px] flex flex-row gap-2">
        <div
          className="w-[20px] bg-[#959BA2] h-[20px] rounded-full "
        ></div>
        <span>
        Drag Me
        </span>
      </div>
      <div className="bottom-slider fixed bottom-0 left-[141px] flex flex-row gap-2">
        <div
          className="w-[20px] bg-[#959BA2] h-[20px] rounded-full "
        ></div>
        <span>
          Drag Me
        </span>
      </div>
    </div>
     
    </>
  );
};

export default DraggableNav;

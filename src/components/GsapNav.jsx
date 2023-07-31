import React from "react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

const GsapNav = () => {
  const slider = useRef(null);
  const dateLabel = useRef(null);
  const moveable = useRef(null);
  const [pressed, setPressed] = useState(false);
  const [position, setYPosition] = useState(0);
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(Draggable);

  useEffect(() => {
    let height =
      window.innerHeight + moveable.current.getBoundingClientRect().height;
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.querySelector("body"),
        start: "top top",
        end: "bottom top",
        scrub: true,
        bounds: {top: 0, left: 0, width:window.innerWidth, height: window.innerHeight},
        // markers: true,
      },
    });

    tl.to(".moveable", {
      top: `+=${height}`,
    });

    Draggable.create(".moveable", {
        type:"y",
        bounds: {top: 0, left: 0, width:window.innerWidth, height: window.innerHeight},
        inertia: true,
        onClick: function() {
            console.log("clicked");
        },
        onDrag: function() {
            const bottom = document.querySelector(".moveable").getBoundingClientRect().bottom
            console.log(this.maxY)
        }
    });
    return () => {};
  }, [pressed]);

  useEffect(() => {}, [position]);

  return (
    <>
    <div className="w-full h-full absolute container top-0 left-0">
    <div className="w-[3px] bg-[#959BA2] h-screen fixed left-[50px] top-0"></div>
      <div className="moveable fixed top-0 left-[41px] flex flex-row gap-2"
      ref={moveable}>
        <div
          className="w-[20px] bg-[#959BA2] h-[20px] rounded-full "
        ></div>
        <span>
          Scroll me
        </span>
      </div>
      
    </div>
     
    </>
  );
};

export default GsapNav;

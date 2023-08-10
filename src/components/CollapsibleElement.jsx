import React from "react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import Collapsible from "react-collapsible";

const CollapsibleElement = (props) => {
  const handlerRef = useRef(null);
  const labelTextRef = useRef(null);
  const scrollRef = useRef(null);
  const barRef = useRef(null);

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

    let maxLabelPos = document.querySelector(".bar").offsetWidth - labelTextRef.current.offsetWidth;
    // this ScrollTrigger will use the window/<body> by default, calling onRefresh when the page resizes, and onUpdate whenever any scroll happens.
    //TODO see if there is an on create method and run onResize there
    trigger = ScrollTrigger.create({
      horizontal: true,
      scroller: scrollRef.current,
      bounds: {
        minX: 0,
        maxX: barRef.current.offsetWidth,
      },
      onRefresh: onResize,
      onUpdate: onResize,
      trigger: handler,
      scrub: true,
      end: `+=${scrollRef.current.offsetWidth * 3}`, //hardcoded for now. there are 3 images
    });

    draggable = Draggable.create(handler, {
      type: "x",
      bounds: {
        minX: 0,
        maxX: barRef.current.offsetWidth - handler.offsetWidth,
      },
      onDragStart: onResize,
      onDrag: function () {
        setText(this.x);
        trigger.scroll((this.x / barLength) * maxScroll); // when dragging, scroll the page to the corresponding ratio
      },
    })[0];

    //labelTextRef.current.applyBounds({minX: 0, maxX: barRef.current.offsetWidth - labelTextRef.current.offsetWidth})


    function onResize() {
       
        
        maxScroll = ScrollTrigger.maxScroll(scrollRef.current, true); // record the maximum scroll value for the page
        barLength = document.querySelector(".bar").offsetWidth - handler.offsetWidth;
        updateHandler();
    }

    function setText(x) {
      const percent = x / window.innerWidth;
      labelTextRef.current.innerHTML =
        startYear + Math.round((endYear - startYear) * percent);
    }

    function updateHandler() {
      // move the handler to the corresponding ratio according to the page's scroll position.
      let newX = 0;

      if (maxScroll > 0) {
        newX = (barLength * trigger.scroll()) / maxScroll;
        console.log({barLength, maxScroll})
      } 
      setText(newX);
      console.log(newX)
      gsap.set(handler, { x: newX });
      gsap.set(labelTextRef.current , { x: newX < maxLabelPos ? newX : maxLabelPos });

    }

    const onResizeWindow = () => {
         if(draggable){
            draggable.applyBounds({
                minX: 0,
                maxX: barRef.current.offsetWidth - handler.offsetWidth,
            })
        }
        maxLabelPos = document.querySelector(".bar").offsetWidth - labelTextRef.current.offsetWidth;
    }
    window.addEventListener('resize',  onResizeWindow)

  }, []);

  return (
    <>
      <Collapsible
        trigger={
          <div className="relative">
            <div
              ref={barRef}
              className="bar bg-[#959BA2] h-[2px] absolute top-0 left-0 right-0"
            >
              <div
                id="handler"
                
                className="relative z-1  -top-[9px] left-0 w-[20px]"
              >
                <div ref={handlerRef} className="w-[20px] h-[20px] rounded-full bg-[#959BA2]"></div>
                <span className="absolute left-0 top-[20px]" ref={labelTextRef}>
                  {startYear}
                </span>
              </div>
            </div>
          </div>
        }
        overflowWhenOpen="scroll"
        className="max-h-1/2"
      >
        <div ref={scrollRef} className="flex flex-row w-screen overflow-scroll">
          <img src="./dia.png" className="h-fit" />
          <img src="./dia.png" className="h-1/3" />
          <img src="./dia.png" className="w-full" />
        </div>
      </Collapsible>
    </>
  );
};

export default CollapsibleElement;

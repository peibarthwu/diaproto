import React from "react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

const VerticalSliderEase = () => {
  const handlerRef = useRef(null);
  const labelTextRef = useRef(null);
  const barRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(Draggable);

  const yearInterval = 1;
  const startYear = 1974;
  const endYear = 2024;

  const [currYear, setCurrYear] = useState(startYear);

  let entries = [];
  const numYears = (endYear - startYear) / yearInterval;
  for (let i = 0; i < numYears; i++) {
    entries.push({ year: startYear + i, entries: 1 });
  }
  useEffect(() => {
    let handler = handlerRef.current,
      barLength,
      maxScroll,
      trigger,
      draggable;
    console.log(handler);
    let animating = false;

    const labels = document.querySelectorAll(".label");
    console.log(labels);

    trigger = ScrollTrigger.create({
      onRefresh: onResize,
      onUpdate: updateHandler,
    });

    draggable = Draggable.create(handler, {
      type: "y",
      bounds: ".bar",
      onDragEnd: function () {
        animating = true;
        gsap.to(trigger, {
          scroll: (this.y / barLength) * maxScroll,
          ease: "linear.inOut",
          duration: 1,
          onComplete: () => {
            animating = false;
          },
        });
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
      const newYear = startYear + Math.round((endYear - startYear) * percent);
      labelTextRef.current.innerHTML = newYear;
      setCurrYear(newYear);
      console.log({ newYear });
      console.log({ calc: startYear - currYear });

      //bold correct data
    }

    function updateHandler() {
      if (!animating) {
        // move the handler to the corresponding ratio according to the page's scroll position.
        const newY = (barLength * trigger.scroll()) / maxScroll;
        setText(newY);
        gsap.set(handler, { y: newY });
      }
    }

    barRef.current.addEventListener("click", (e) => {
      const newY = e.clientY;
      setText(newY);
      gsap.set(handler, { y: e.clientY });
      animating = true;
      gsap.to(trigger, {
        scroll: (e.clientY / barLength) * maxScroll,
        ease: "linear.inOut",
        duration: 1,
        onComplete: () => {
          animating = false;
        },
      });
    });
  }, []);

  return (
    <>
      {/* <div className="fixed top-0 left-0 bottom-0">
        {entries.map((entry, i) => {
          return (
            <span
              className={`w-[44px] h-[44px] pl-8 rounded-full absolute label color-red`}
              style={{
                top: `${
                  ((((endYear - startYear) / yearInterval) * i) /
                    (endYear - startYear)) *
                    2 -
                  0.5
                }%`,
              }}
              key={i}
            >
              {startYear + i}
            </span>
          );
        })}
      </div> */}
      <div
        ref={barRef}
        className="opacity-50 bar bg-[#3392ff] mr-[53px] w-[44px] fixed top-0 right-0 bottom-0"
      ></div>
      <div className="bar bg-[#959BA2] mr-[75px] w-[2px] fixed top-0 right-0 bottom-0">
        <div
          id="handler"
          ref={handlerRef}
          className="relative z-1  -left-[9px]"
        >
          <div className="w-[20px] h-[20px] rounded-full bg-[#959BA2]"></div>
          <span className="absolute top-0 right-[25px]" ref={labelTextRef}>
            {startYear}
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        {entries.map((entry, i) => {
          console.log("Entered");
          // Return the element. Also pass key
          return (
            <section
              className="panel w-screen h-screen flex justify-center items-center text-3xl"
              style={{
                backgroundColor: `${i % 2 ? "black" : "white"}`,
                color: `${i % 2 ? "white" : "black  "}`,
              }}
              key={entries.length + i}
            >
              {startYear + i}
            </section>
          );
        })}
      </div>
    </>
  );
};

export default VerticalSliderEase;

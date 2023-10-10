import React from "react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

const VerticalSliderEase = (props) => {
  const horizontal = props.horizontal ? props.horizontal : false;
  const handlerRef = useRef(null);
  const labelTextRef = useRef(null);
  const barRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(Draggable);

  const yearInterval = 1;
  const startYear = 1974;
  //   const endYear = 2024;
  const endYear = 2024;
  const [currYear, setCurrYear] = useState(startYear);

  let entries = [];
  const numYears = (endYear - startYear) / yearInterval;
  for (let i = 0; i < numYears; i++) {
    entries.push({
      year: startYear + i,
      entries: [
        { title: "Entry 1" },
        { title: "Entry 2" },
        { title: "Entry 3" },
      ],
    });
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
      onDrag: function () {
        setText(this.y);
      },
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

    //horizontal scrubbing
    if (horizontal) {
      let yearEntries = document.querySelectorAll(".year-entry");
      for (let i = 0; i < yearEntries.length; i++) {
        let sections = gsap.utils.toArray(".panel", yearEntries[i]);
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: yearEntries[i],
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: () => "+=" + yearEntries[i].offsetWidth,
          },
        });
      }
    }
  }, []);

  return (
    <>
      <div className="relative z-10">
        <div
          ref={barRef}
          className="opacity-50 bar bg-[#3392ff] mr-[53px] md:ml-[53px] right-0 md:left-0 w-[44px] fixed top-0  bottom-0"
        ></div>
        <div className="bar bg-[#959BA2] right-0 md:left-0 mr-[75px] md:ml-[75px] w-[2px] fixed top-0  bottom-0">
          <div
            id="handler"
            ref={handlerRef}
            className="relative z-1  -left-[9px]"
          >
            <div className="w-[20px] h-[20px] rounded-full bg-[#959BA2]"></div>
            <span
              className="absolute top-0 left-[27px] md:right-[27px]"
              ref={labelTextRef}
            >
              {startYear}
            </span>
          </div>
        </div>
      </div>

      <div>
        {entries.map((entry, i) => {
          // Return the element. Also pass key
          return (
            <div className="flex flex-row year-entry flex-nowrap w-[300vw]">
              {entry.entries.map((entry, j) => {
                return (
                  <section
                    className="panel w-screen h-screen flex justify-center items-center text-3xl"
                    style={{
                      backgroundColor: `${i % 2 ? "#555555" : "white"}`,
                      color: `${i % 2 ? "#ffffff" : "#555555"}`,
                    }}
                    key={entries.length + i + j}
                  >
                    {startYear + i}, {entry.title}
                  </section>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default VerticalSliderEase;

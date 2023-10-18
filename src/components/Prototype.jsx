import React from "react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import FilterDot from "./FilterDot";
import HorizontalDrag from "./HorizontalDrag";
import HorizontalSection from "./HorizontalSection";
const filterDates = [1983, 1984, 1985, 1990, 2002, 2003, 2010];

const Prototype = (props) => {
  const horizontal = props.horizontal ? props.horizontal : false;

  const handlerRef = useRef(null);
  const labelTextRef = useRef(null);
  const barRef = useRef(null);
  const dragIndicatorScreen = useRef(null);
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(Draggable);

  const yearInterval = 1;
  const startYear = 1974;
  //   const endYear = 2024;
  const endYear = 2024;
  const [currYear, setCurrYear] = useState(startYear);
  const [showFilters, setShowFilters] = useState(false);

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
      trigger;
    let animating = false;

    trigger = ScrollTrigger.create({
      onRefresh: onResize,
      onUpdate: updateHandler,
    });

    Draggable.create(handler, {
      type: "y",
      bounds: ".bar",
      onDragStart: function () {
        console.log("drag start");
        dragIndicatorScreen.current.style.display = "block";
      },
      onDrag: function () {
        setText(this.y);
      },
      onDragEnd: function () {
        animating = true;
        const closestYear = parseInt(
          startYear + (this.y / barLength) * numYears
        );
        const fraction = (closestYear - startYear) / numYears;
        console.log({ fraction });

        gsap.to(trigger, {
          scroll: fraction * maxScroll,
          ease: "linear.inOut",
          duration: 1,
          onComplete: () => {
            console.log("onComplete");
            animating = false;
            dragIndicatorScreen.current.style.display = "none";
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

    handlerRef.current.addEventListener("click", (e) => {
      console.log("click");
    });
    barRef.current.addEventListener("click", (e) => {
      console.log("click bar");
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
      <div>
        {entries.map((entry, i) => {
          return (
            <div
              className="flex flex-row year-entry flex-nowrap h-screen opacity-50"
              key={i}
              style={{
                backgroundColor: `${i % 2 ? "#555555" : "white"}`,
                color: `${i % 2 ? "#ffffff" : "#555555"}`,
              }}
            >
              <HorizontalSection entries={entry.entries} />
            </div>
          );
        })}
        <div
          className="backdrop-blur-sm w-screen md:opacity-0 h-screen fixed z-4 top-0 bottom-0 left-0 right-0 flex justify-center items-center text-3xl bg-black bg-opacity-10 color-white"
          ref={dragIndicatorScreen}
          style={{
            display: "none",
          }}
        >
          {currYear}
        </div>
      </div>
      <div className="relative">
        <div className="bar bg-[#959BA2] right-0 md:left-0 mr-[75px] md:ml-[75px] w-[2px] fixed top-0  bottom-0">
          <div
            ref={barRef}
            className="opacity-10 bar bg-[#3392ff] mr-[53px] md:ml-[53px] right-0 md:left-0 w-[44px] fixed top-0 bottom-0 z-5"
            style={{
              zIndex: 5,
            }}
          ></div>
          <div
            id="handler"
            ref={handlerRef}
            className="relative  -left-[9px] w-[20px] h-[20px]"
            style={{
              zIndex: 6,
            }}
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
        {showFilters == true ? (
          <div className="fixed top-0 md:left-0 bottom-0">
            {filterDates.map((item, i) => {
              return (
                <div
                  className="absolute md:mr-[55px] ml-[-5px] md:ml-[70px]"
                  style={{
                    zIndex: 7,
                    top: `${100 - (100 * (endYear - item)) / numYears}%`,
                  }}
                  key={i}
                >
                  <FilterDot year={item} />
                </div>
              );
            })}
          </div>
        ) : (
          <> </>
        )}
      </div>
      <button
        className="fixed bottom-0 left-0 bg-[#959BA2] p-1"
        onClick={() => {
          setShowFilters(!showFilters);
          console.log(showFilters);
        }}
      >
        Toggle Filter Labels {showFilters}
      </button>
    </>
  );
};

export default Prototype;

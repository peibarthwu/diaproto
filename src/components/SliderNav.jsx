import React from "react";
import { useState, useEffect, useRef } from "react";

const SliderNav = () => {
  const slider = useRef(null);
  const dateLabel = useRef(null);
  const [pressed, setPressed] = useState(false);
  const [position, setYPosition] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const sliderBoundingRect = slider.current.getBoundingClientRect();
      const sliderHeight = sliderBoundingRect.height;
      const sliderTop = sliderBoundingRect.top;

      let h = document.documentElement,
        b = document.body,
        st = "scrollTop",
        sh = "scrollHeight";
      const scrollPercent =
        ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
      let offset = (scrollPercent / 100) * window.innerHeight - sliderHeight;
      // console.log({
      //   offset: offset,
      //   sliderTop: sliderTop - offset,
      // });
      if (offset > 0) {
        setYPosition(offset);
      } else {
        setYPosition(0);
      }
    };
    //document.addEventListener("scroll", onScroll);

    const onMouseUp = () => {
      setPressed(false);
    };
    document.addEventListener("mouseup", onMouseUp);

    const onMouseMove = (event) => {
      if (pressed) {
        setYPosition(event.clientY);
      }
    };
    document.addEventListener("mousemove", onMouseMove);

    return () => {
      //document.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [pressed]);

  useEffect(() => {
    if (position > 0 && position < window.innerHeight) {
      slider.current.style.top = position + "px";
      dateLabel.current.style.top = position + "px";
      const sliderHeight = slider.current.getBoundingClientRect().height;
      const scrollPercent =
        (position / (window.innerHeight - sliderHeight)) * 100;

      if (scrollPercent == 100) {
        dateLabel.current.innerHTML = "2024";
      } else if (scrollPercent > 80) {
        dateLabel.current.innerHTML = "2014";
      } else if (scrollPercent > 60) {
        dateLabel.current.innerHTML = "2004";
      } else if (scrollPercent > 40) {
        dateLabel.current.innerHTML = "1994";
      } else if (scrollPercent > 20) {
        dateLabel.current.innerHTML = "1984";
      } else {
        dateLabel.current.innerHTML = "1974";
      }
    }
  }, [position]);

  return (
    <>
      <div className="w-[3px] bg-[#959BA2] h-screen fixed left-[50px] top-0"></div>
      <div
        ref={slider}
        //onMouseMove={onMouseMove}
        onMouseDown={() => {
          setPressed(true);
          console.log("mouse down");
        }}
        onMouseUp={() => setPressed(false)}
        className="w-[20px] bg-[#959BA2] h-[20px] rounded-full fixed left-[41px] top-0"
      ></div>
      <span ref={dateLabel} className="fixed left-[70px] top-0">
        Drag me
      </span>
    </>
  );
};

export default SliderNav;

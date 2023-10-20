import { useState, useEffect, useRef } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";

const SplideTest = (props) => {
  return (
    <Splide
      options={{
        // type: "loop",
        perPage: 2,
        perMove: 1,
        drag: "free",
        snap: true,
        height: "100vh",
        loop: false,
        pagination: false,
        arrows: true,
        keyboard: true,
        paginationKeyboard: true,
      }}
      aria-label="My Favorite Images"
      className="w-screen h-screen shrink-0"
    >
      <SplideSlide className="shrink-0 h-screen flex justify-center items-center pl-[100px]">
        <img src="dia.png" alt="Image 2" className="object-cover h-1/2 " />
      </SplideSlide>
      <SplideSlide className="shrink-0 h-screen flex justify-center items-center pl-[100px]">
        <img src="pardo.png" alt="Image 2" className="object-cover h-1/2" />
      </SplideSlide>
      <SplideSlide className="shrink-0 h-screen flex justify-center items-center pl-[100px]">
        <img src="gallery.png" alt="Image 2" className="object-cover h-1/2" />
      </SplideSlide>
    </Splide>
  );
};
export default SplideTest;

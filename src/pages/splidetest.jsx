import React from "react";
import { SplideTest } from "../components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";

const Test = () => {
  return (
    <Splide
      options={{
        perPage: 1,
        perMove: 1,
        snap: true,
        height: "100vh",
        direction: "ttb",
        wheel: true,
        arrows: false,
        pagination: false,
        keyboard: true,
      }}
      aria-label="My Favorite Images"
      className="w-screen h-screen shrink-0"
    >
      <SplideSlide className="shrink-0 h-screen flex justify-center items-center">
        <SplideTest />
      </SplideSlide>
      <SplideSlide className="shrink-0 h-screen flex justify-center items-center">
        <SplideTest />
      </SplideSlide>
    </Splide>
  );
};

export default Test;

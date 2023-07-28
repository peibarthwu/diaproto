import React from "react";
import { GrowingScrollNav, SliderNav } from "../components";
import { ScrollNav } from "../components";

const Experiment2 = () => {
    return (
        <div>
            <h1>
            Experiment2
            </h1>
            <div className="h-[4000px]">
            Content here
            </div>
            <SliderNav/>
            <ScrollNav/>
            <GrowingScrollNav/>
        </div>
    );
};
 
export default Experiment2;
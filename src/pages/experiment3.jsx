import React from "react";
import { CollapsibleElement, HorizontalDrag } from "../components";

const Experiment3 = () => {
  return (
    <div className="flex flex-col w-screen min-h-screen justify-evenly absolute top-0 left-0 right-0">
      <CollapsibleElement date={1970}/>
      <CollapsibleElement date={1980}/>
      <CollapsibleElement date={1990} />
      <CollapsibleElement date={2000}/>
      <CollapsibleElement date={2010}/>
      <CollapsibleElement date={2020}/>
    </div>
  );
};

export default Experiment3;

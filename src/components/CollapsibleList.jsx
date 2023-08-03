import React from "react";
import { HorizontalDrag } from "./";
import Collapsible from "react-collapsible";

const CollapsibleList = () => {
  return (
    <div className="flex flex-col w-screen min-h-screen justify-evenly absolute top-0 left-0">
      <Collapsible
        trigger={<HorizontalDrag date={1970} />}
        overflowWhenOpen="scroll"
        className="max-h-1/2"
      >
        <div className="flex flex-row">
          <img src="./dia.png" className="h-fit" />
          <img src="./dia.png" className="w-full" />
          <img src="./dia.png" className="w-full" />
        </div>
      </Collapsible>
      <Collapsible
        trigger={<HorizontalDrag date={1980} />}
        overflowWhenOpen="scroll"
      >
        <div className="flex flex-row">
          <img src="./dia.png" className="h-fit" />
          <img src="./dia.png" className="w-full" />
          <img src="./dia.png" className="w-full" />
        </div>
      </Collapsible>
      <Collapsible
        trigger={<HorizontalDrag date={1990} />}
        overflowWhenOpen="scroll"
      >
        <div className="flex flex-row">
          <img src="./dia.png" className="h-fit" />
          <img src="./dia.png" className="w-full" />
          <img src="./dia.png" className="w-full" />
        </div>
      </Collapsible>
      <Collapsible
        trigger={<HorizontalDrag date={2000} />}
        overflowWhenOpen="scroll"
      >
        <div className="flex flex-row">
          <img src="./dia.png" className="h-fit" />
          <img src="./dia.png" className="w-full" />
          <img src="./dia.png" className="w-full" />
        </div>
      </Collapsible>
      <Collapsible
        trigger={<HorizontalDrag date={2010} />}
        overflowWhenOpen="scroll"
      >
        <div className="flex flex-row">
          <img src="./dia.png" className="h-fit" />
          <img src="./dia.png" className="w-full" />
          <img src="./dia.png" className="w-full" />
        </div>
      </Collapsible>
      <Collapsible
        trigger={<HorizontalDrag date={2020} />}
        overflowWhenOpen="scroll"
      >
        <div className="flex flex-row">
          <img src="./dia.png" className="h-fit" />
          <img src="./dia.png" className="w-full" />
          <img src="./dia.png" className="w-full" />
        </div>
      </Collapsible>
    </div>
  );
};

export default CollapsibleList;

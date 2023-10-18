import React from "react";
import { HorizontalSection, Prototype, Example } from "../components";

const Prototype1 = () => {
  return (
    <>
      {/* <Example />
      <HorizontalSection
        entries={[
          { title: "Entry 1" },
          { title: "Entry 2" },
          { title: "Entry 3" },
        ]}
      /> */}
      <Prototype horizontal={false} />
    </>
  );
};

export default Prototype1;

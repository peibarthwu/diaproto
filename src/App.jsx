import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import Experiment1 from "./pages/experiment1";
import Experiment2 from "./pages/experiment2";
import Experiment3 from "./pages/experiment3";
import Prototype1 from "./pages/prototype1";
import Prototype2 from "./pages/prototype2";
import Test from "./pages/splidetest";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/experiment1" element={<Experiment1 />} />
        <Route path="/experiment2" element={<Experiment2 />} />
        <Route path="/experiment3" element={<Experiment3 />} />
        <Route path="/prototype1" element={<Prototype1 />} />
        <Route path="/prototype2" element={<Prototype2 />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <h1>Graphics Program Index</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//         This is a collection of graphics programs I have written during my time at Area 17.
//         </p>
//         <h2>How do computer graphics exist within the methodology of modern design?</h2>
//         <p>

//         </p>
//         <h2>The state of graphics programs in 2023</h2>
//         <p>
//         The majority of these "experiments" were built as explorations in what the design industry refers to as "branding"
//         </p>
//       </div>
//     </>
//   )
// }

// export default App

import { useRef, useState } from "react";

import TopPanel from "./components/TopPanel";
import BottomPanel from "./components/BottomPanel";

import "./App.css";

function App() {
  const [selectedColor, setSelectedColor] = useState("#000000");

  const colorInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <>
      <TopPanel />
      <canvas
        ref={canvasRef}
        className="bg-slate-200"
        width={window.innerWidth}
        height={window.innerHeight}
      />
      <BottomPanel
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        colorInputRef={colorInputRef}
      />
    </>
  );
}

export default App;

// {/* <div className="absolute bottom-0 left-0">
//   <div className="flex items-end">
//     <div className="flex flex-col">
//       <div
//         id="icon-eraser"
//         className="flex items-center justify-center mx-2 my-1 rounded-full w-11 h-11 drop-shadow-lg bg-slate-100"
//       >
//         e
//       </div>
//       <div
//         id="swatch"
//         className="flex items-center justify-center w-20 h-20 m-2 rounded-b-full rounded-tl-full drop-shadow-lg bg-slate-100"
//       >
//         <div
//           className="w-16 h-16 rounded-full"
//           style={{ backgroundColor: selectedColor }}
//           onClick={() => colorInputRef.current?.click()}
//         >
//           <input
//             type="color"
//             ref={colorInputRef}
//             value={selectedColor}
//             onChange={(e) => setSelectedColor(e.target.value)}
//             className="invisible"
//           />
//         </div>
//       </div>
//     </div>
//     <div className="flex items-center gap-2">
//       <div
//         id="icon-brush"
//         className="flex items-center justify-center mx-1 my-2 rounded-full w-11 h-11 drop-shadow-lg bg-slate-100"
//       >
//         b
//         {/* <div
//           onClick={() => setSelectedColor("#000000")}
//           className="w-8 h-8 bg-black rounded-full"
//         ></div> */}
//       </div>
//       <input type="range" />
//     </div>
//   </div>
// </div> */}

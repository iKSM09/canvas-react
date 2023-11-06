import { useEffect, useLayoutEffect, useRef, useState } from "react";

const Playground = () => {
  return (
    <canvas
      ref={canvasRef}
      onMouseDown={onMouseDown}
      className="bg-slate-200"
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};

export default Playground;

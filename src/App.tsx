import { useEffect, useLayoutEffect, useRef, useState } from "react";

import TopPanel from "./components/TopPanel";
import BottomPanel from "./components/BottomPanel";

import "./App.css";

function App() {
  const [brushColor, setBrushColor] = useState("#000");
  const [brushSize, setBrushSize] = useState(5);
  // const [history, setHistory] = useState<ImageData[]>([])
  const [pointer, setPointer] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawHistory = useRef<ImageData[]>([]);
  // const historyPointer = useRef(0);
  const shouldDraw = useRef(false);

  const history = (command: "undo" | "redo") => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    const history = drawHistory.current;
    // let pointer = historyPointer.current;

    if (command === "undo" && pointer > 0) setPointer((p) => p - 1);
    if (command === "redo" && pointer < history.length - 1)
      setPointer((p) => p + 1);
    const imageData = history[pointer];
    ctx?.putImageData(imageData, 0, 0);

    console.log({ history });
    console.log({ pointer });
    console.log({ imageData });
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Add elements in behind
    ctx.globalCompositeOperation = "destination-over";
    // Add Background
    ctx.fillStyle = "rgb(226 232 240 / 1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Add elements in front
    ctx.globalCompositeOperation = "source-over";
  };

  const download = () => {
    const canvas = canvasRef.current;

    const URL = canvas?.toDataURL();
    const anchor = document.createElement("a");
    anchor.href = URL!;
    anchor.download = "sketch.png";
    anchor.click();
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    if (ctx) {
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;
    }
  }, [brushColor, brushSize]);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      // Add elements in behind
      ctx.globalCompositeOperation = "destination-over";
      // Add Background
      ctx.fillStyle = "rgb(226 232 240 / 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Add elements in front
      ctx.globalCompositeOperation = "source-over";
    }

    const beginPath = (x: number, y: number) => {
      ctx?.beginPath();
      ctx?.moveTo(x, y);
    };

    const drawLine = (x: number, y: number) => {
      ctx?.lineTo(x, y);
      ctx?.stroke();
    };

    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      shouldDraw.current = true;
      if (e instanceof MouseEvent) beginPath(e.clientX, e.clientY);
      if (e instanceof TouchEvent)
        beginPath(e.touches[0].clientX, e.touches[0].clientY);
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!shouldDraw.current) return;
      if (e instanceof MouseEvent) drawLine(e.clientX, e.clientY);
      if (e instanceof TouchEvent)
        drawLine(e.touches[0].clientX, e.touches[0].clientY);
    };

    const handleMouseUp = () => {
      shouldDraw.current = false;

      const imageData = ctx?.getImageData(0, 0, canvas?.width, canvas?.height);
      drawHistory.current.push(imageData!);
      // historyPointer.current = drawHistory.current.length - 1;
      setPointer(drawHistory.current.length - 1);
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    canvas.addEventListener("touchstart", handleMouseDown);
    canvas.addEventListener("touchmove", handleMouseMove);
    canvas.addEventListener("touchend", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);

      canvas.removeEventListener("touchstart", handleMouseDown);
      canvas.removeEventListener("touchmove", handleMouseMove);
      canvas.removeEventListener("touchend", handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TopPanel history={history} clear={clearCanvas} download={download} />
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="bg-slate-200"
      />
      <BottomPanel
        color={brushColor}
        setColor={setBrushColor}
        size={brushSize}
        setSize={setBrushSize}
      />
    </>
  );
}

export default App;

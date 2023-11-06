import { useEffect, useLayoutEffect, useRef, useState } from "react";

export type Draw = {
  ctx: CanvasRenderingContext2D;
  currentPoint: Point;
  prevPoint: Point | null;
};

type Point = { x: number; y: number };

type BrushProperties = {
  brushColor: string;
  brushSize: number;
};

export const useDraw = (
  // onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void
  { brushColor, brushSize }: BrushProperties
) => {
  const [mouseDown, setMouseDown] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const prevPoint = useRef<Point | null>(null);
  const drawHistory = useRef<ImageData[]>([]);
  const historyPointer = useRef(0);

  const onMouseDown = () => setMouseDown(true);

  const history = (command: "undo" | "redo") => {
    console.log("start");

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    const history = drawHistory.current;
    let pointer = historyPointer.current;
    console.log({ history }, { pointer });

    if (command === "undo" && pointer > 0) pointer -= 1;
    if (command === "redo" && pointer < history.length - 1) pointer += 1;
    const imageData = history[pointer];
    ctx?.putImageData(imageData, 0, 0);
    console.log({ imageData });
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const download = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      // Add behind elements.
      ctx.globalCompositeOperation = "destination-over";
      // Add Background
      ctx.fillStyle = "rgb(226 232 240 / 1)";
      ctx?.fillRect(0, 0, canvas.width, canvas.height);
    }

    const URL = canvasRef.current?.toDataURL();
    const anchor = document.createElement("a");
    anchor.href = URL!;
    anchor.download = "sketch.png";
    anchor.click();
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brushColor, brushSize]);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    const beginPath = (x: number, y: number) => {
      ctx?.beginPath();
      ctx?.moveTo(x, y);
    };

    const drawLine = (x: number, y: number) => {
      ctx?.lineTo(x, y);
      ctx?.stroke();
    };

    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      setMouseDown(true);
      if (e instanceof MouseEvent) beginPath(e.clientX, e.clientY);
      if (e instanceof TouchEvent)
        beginPath(e.touches[0].clientX, e.touches[0].clientY);
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!mouseDown) return;
      if (e instanceof MouseEvent) drawLine(e.clientX, e.clientY);
      if (e instanceof TouchEvent)
        drawLine(e.touches[0].clientX, e.touches[0].clientY);
    };

    const handleMouseUp = () => {
      setMouseDown(false);

      const imageData = ctx?.getImageData(0, 0, canvas?.width, canvas?.height);
      drawHistory.current.push(imageData!);
      historyPointer.current = drawHistory.current.length - 1;
    };

    // const handler = (e: MouseEvent) => {
    //   if (!mouseDown) return;
    //   const currentPoint = {
    //     x: e.clientX,
    //     y: e.clientY,
    //   };

    //   if (!ctx || !currentPoint) return;

    //   onDraw({ ctx, currentPoint, prevPoint: prevPoint.current });
    //   prevPoint.current = currentPoint;
    // };

    // const mouseUpHandler = () => {
    //   setMouseDown(false);
    //   prevPoint.current = null;
    // };

    // canvas?.addEventListener("mousemove", handler);
    // window.addEventListener("mouseup", mouseUpHandler);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    canvas.addEventListener("touchstart", handleMouseDown);
    canvas.addEventListener("touchmove", handleMouseMove);
    canvas.addEventListener("touchend", handleMouseUp);

    return () => {
      // canvas?.removeEventListener("mousemove", handler);
      // window.removeEventListener("mouseup", mouseUpHandler);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);

      canvas.removeEventListener("touchstart", handleMouseDown);
      canvas.removeEventListener("touchmove", handleMouseMove);
      canvas.removeEventListener("touchend", handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { canvasRef, onMouseDown, history, clearCanvas, download };
};

import { useEffect, useRef, useState } from "react";

export type Draw = {
  ctx: CanvasRenderingContext2D;
  currentPoint: Point;
  prevPoint: Point | null;
};

type Point = { x: number; y: number };

export const useDraw = (
  onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void
) => {
  const [mouseDown, setMouseDown] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevPoint = useRef<null | Point>(null);

  const onMouseDown = () => setMouseDown(true);

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
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    const handler = (e: MouseEvent) => {
      if (!mouseDown) return;
      const currentPoint = {
        x: e.clientX,
        y: e.clientY,
      };

      if (!ctx || !currentPoint) return;

      onDraw({ ctx, currentPoint, prevPoint: prevPoint.current });
      prevPoint.current = currentPoint;
    };

    const mouseUpHandler = () => {
      setMouseDown(false);
      prevPoint.current = null;
    };

    canvas?.addEventListener("mousemove", handler);
    window.addEventListener("mouseup", mouseUpHandler);

    return () => {
      canvas?.removeEventListener("mousemove", handler);
      window.removeEventListener("mouseup", mouseUpHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onDraw]);

  return { canvasRef, onMouseDown, clearCanvas, download };
};

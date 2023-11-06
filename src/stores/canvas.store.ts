import { create } from "zustand";

type StoreTypes = {
  // state
  color: string;
  size: number;
  drawHistory: ImageData[];
  historyPointer: 0;
  shouldDraw: boolean;

  // action
  history: (command: "undo" | "redo") => void;
  clearCanvas: () => void;
  download: () => void;
};

const useCanvasStore = create<StoreTypes>()((set) => ({
  color: "#000",
  size: 5,
  drawHistory: [],
  historyPointer: 0,
  shouldDraw: false,
}));

import { Dispatch, RefObject, SetStateAction } from "react";
import Icon from "./Icons";

type props = {
  selectedColor: string;
  setSelectedColor: Dispatch<SetStateAction<string>>;
  colorInputRef: RefObject<HTMLInputElement>;
};

const BottomPanel = ({
  selectedColor,
  setSelectedColor,
  colorInputRef,
}: props) => {
  return (
    <div id="bottom-panel" className="absolute bottom-0 left-0 m-2">
      <div id="col" className="flex flex-col items-start gap-3">
        <Icon.eraser />
        <div id="row" className="flex items-end gap-3">
          <div
            id="swatch"
            className="flex items-center justify-center w-20 h-20 rounded-b-full rounded-tl-full drop-shadow-lg bg-slate-100"
          >
            <div
              className="w-16 h-16 rounded-full"
              style={{ backgroundColor: selectedColor }}
              onClick={() => colorInputRef.current?.click()}
            >
              <input
                type="color"
                ref={colorInputRef}
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="invisible"
              />
            </div>
          </div>
          <div id="inner-row" className="flex items-center gap-3">
            <Icon.brush />
            <input type="range" className="mt-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomPanel;

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

type PropsType = {
  color: string;
  size: number;
  setColor: Dispatch<SetStateAction<string>>;
  setSize: Dispatch<SetStateAction<number>>;
};

const buttonClass =
  "flex items-center justify-center rounded-full hover:bg-blue-300 w-11 h-11 drop-shadow-lg bg-slate-100 active:bg-blue-900 focus:bg-blue-900 active:text-slate-100 focus:text-slate-100";

const BottomPanel = ({ color, setColor, size, setSize }: PropsType) => {
  const [isErase, setIsErase] = useState(false);
  const [brushSize, setBrushSize] = useState(size);
  const colorInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setColor(
      isErase ? "rgb(226 232 240 / 1)" : colorInputRef.current?.value ?? "#000"
    );
    setSize(isErase ? 40 : brushSize);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErase, brushSize]);

  return (
    <div id="bottom-panel" className="absolute bottom-0 left-0 m-2">
      <div id="col" className="flex flex-col items-start gap-3 ">
        <button
          id="icon-eraser"
          onClick={() => setIsErase(true)}
          className={buttonClass}
          style={{
            backgroundColor: `${
              isErase ? "rgb(30 58 138 / 1)" : "rgb(241 245 249 / 1)"
            }`,
            color: `${isErase ? "rgb(241 245 249 / 1)" : ""}`,
          }}
        >
          e
        </button>
        <div id="row" className="flex items-end gap-3">
          <div
            id="swatch"
            className="flex items-center justify-center w-20 h-20 rounded-b-full rounded-tl-full drop-shadow-lg bg-slate-100"
          >
            <div
              className="w-16 h-16 rounded-full"
              style={{ backgroundColor: color }}
              onClick={() => colorInputRef.current?.click()}
            >
              <input
                type="color"
                ref={colorInputRef}
                onChange={(e) => setColor(e.target.value)}
                className="invisible"
              />
            </div>
          </div>
          <div id="inner-row" className="flex items-center gap-3">
            <button
              id="icon-eraser"
              onClick={() => setIsErase(false)}
              className={buttonClass}
              style={{
                backgroundColor: `${
                  isErase ? "rgb(241 245 249 / 1)" : "rgb(30 58 138 / 1)"
                }`,
                color: `${isErase ? "" : "rgb(241 245 249 / 1)"}`,
              }}
            >
              b
            </button>
            <input
              type="range"
              value={brushSize}
              onChange={(e) => setBrushSize(+e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomPanel;

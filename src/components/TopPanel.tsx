import { FileDown, Paintbrush, Redo, Undo } from "lucide-react";

type PropsType = {
  history: (command: "undo" | "redo") => void;
  clear: () => void;
  download: () => void;
};

const iconClass =
  "flex items-center justify-center h-8 px-4 rounded-sm min-w-8 hover:bg-blue-300 cursor-pointer";

const TopPanel = ({ history, clear, download }: PropsType) => {
  return (
    <div
      id="top-panel"
      className="absolute top-0 right-0 flex gap-2 px-2 py-2 m-2 rounded-md bg-slate-100 drop-shadow-lg"
    >
      <button
        title="undo"
        onClick={() => history("undo")}
        className={iconClass}
      >
        <Undo />
      </button>
      <button
        title="redo"
        onClick={() => history("redo")}
        className={iconClass}
      >
        <Redo />
      </button>
      <button title="clear canvas" onClick={clear} className={iconClass}>
        <Paintbrush />
      </button>
      <button title="download canvas" onClick={download} className={iconClass}>
        <FileDown />
      </button>
    </div>
  );
};

export default TopPanel;

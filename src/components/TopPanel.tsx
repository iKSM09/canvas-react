type PropsType = {
  history: (command: "undo" | "redo") => void;
  clear: () => void;
  download: () => void;
};

const iconClass =
  "flex items-center justify-center h-8 rounded-sm min-w-8 hover:bg-blue-300 cursor-pointer";

const TopPanel = ({ history, clear, download }: PropsType) => {
  return (
    <div
      id="top-panel"
      className="absolute top-0 right-0 flex gap-2 px-2 py-2 m-2 rounded-md bg-slate-100 drop-shadow-lg"
    >
      <div id="undo" onClick={() => history("undo")} className={iconClass}>
        undo
      </div>
      <div id="redo" onClick={() => history("redo")} className={iconClass}>
        redo
      </div>
      <div id="clear" onClick={clear} className={iconClass}>
        clear
      </div>
      <div id="download" onClick={download} className={iconClass}>
        download
      </div>
    </div>
  );
};

export default TopPanel;

const Icon = () => <div>icon</div>;

Icon.brush = () => {
  return (
    <div
      id="icon-brush"
      className="flex items-center justify-center rounded-full hover:bg-blue-300 w-11 h-11 drop-shadow-lg bg-slate-100"
    >
      b
    </div>
  );
};

Icon.eraser = () => {
  return (
    <div
      id="icon-eraser"
      className="flex items-center justify-center rounded-full hover:bg-blue-300 w-11 h-11 drop-shadow-lg bg-slate-100"
    >
      e
    </div>
  );
};

Icon.undo = () => {
  return (
    <div
      id="icon-undo"
      className="flex items-center justify-center w-8 h-8 rounded-sm hover:bg-blue-300"
    >
      u
    </div>
  );
};

Icon.redo = () => {
  return (
    <div
      id="icon-redo"
      className="flex items-center justify-center w-8 h-8 rounded-sm hover:bg-blue-300"
    >
      r
    </div>
  );
};

Icon.download = () => {
  return (
    <div
      id="icon-download"
      className="flex items-center justify-center w-8 h-8 rounded-sm hover:bg-blue-300"
    >
      d
    </div>
  );
};

export default Icon;

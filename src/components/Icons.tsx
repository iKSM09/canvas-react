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

export default Icon;

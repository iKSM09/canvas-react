import Icon from "./Icons";

const TopPanel = () => {
  return (
    <div
      id="top-panel"
      className="absolute top-0 right-0 flex gap-2 px-2 py-2 m-2 rounded-md bg-slate-100 drop-shadow-lg bg-"
    >
      <Icon.undo />
      <Icon.redo />
      <Icon.download />
    </div>
  );
};

export default TopPanel;

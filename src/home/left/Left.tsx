import SearchBox from "./SearchBox";
import User from "./User";

function Left() {
  return (
    <div className="flex-[1]">
      <SearchBox />
      <div className="noScrollBar h-[91vh] overflow-y-auto">
        {Array.from({ length: 15 }).map((_, index) => {
          return <User key={index} />;
        })}
      </div>
    </div>
  );
}

export default Left;

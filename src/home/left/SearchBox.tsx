import { IoSearch } from "react-icons/io5";

function SearchBox() {
  return (
    <div className="p-5 h-[8vh]">
      <label className="input input-bordered flex items-center gap-2">
        <input type="text" className="grow" placeholder="Search" />
        <IoSearch />
      </label>
    </div>
  );
}

export default SearchBox;

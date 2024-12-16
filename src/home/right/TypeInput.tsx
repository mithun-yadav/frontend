import { IoIosSend } from "react-icons/io";

function TypeInput() {
  return (
    <div className="px-8 bg-slate-800 h-[7vh] flex items-center">
      <div className="flex w-full space-x-2">
        <input
          type="text"
          placeholder="Type Message"
          className="input input-bordered w-full"
        />
        <button className="text-4xl">
          <IoIosSend />
        </button>
      </div>
    </div>
  );
}

export default TypeInput;

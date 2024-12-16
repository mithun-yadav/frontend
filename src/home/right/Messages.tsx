import Message from "./Message";
import TypeInput from "./TypeInput";

function Messages() {
  return (
    <>
      <div className="noScrollBar px-5 py-4 overflow-y-auto h-[84vh]">
        {Array.from({ length: 10 }).map((_, index) => {
          return <Message key={index} />;
        })}
      </div>
      <TypeInput />
    </>
  );
}

export default Messages;

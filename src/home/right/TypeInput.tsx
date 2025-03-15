import { IoIosSend } from "react-icons/io";
import useSendMessage from "../../context/useSendMessage";
import { useEffect, useRef, useState } from "react";
import useConversation from "../../stateManage/useConversation";

function TypeInput() {
  const { selectedConversation } = useConversation();
  const { mutate: sendMessages, isPending } = useSendMessage();
  const [message, setMessage] = useState<string>("");
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;
    sendMessages(message);
    setMessage("");
  };
  useEffect(() => {
    setMessage("");
  }, [selectedConversation?._id]);
  const autoFocusRef = useRef(null);
  useEffect(() => {
    if (autoFocusRef.current) {
      (autoFocusRef.current as HTMLInputElement).focus();
    }
    console.log("Called");
  }, [message]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="px-8 bg-slate-800 h-[7vh] flex items-center rounded-[12px]">
        <div className="flex w-full space-x-2">
          <input
            ref={autoFocusRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isPending}
            placeholder="Type Message"
            className="input input-bordered w-full"
          />
          <button className="text-4xl">
            <IoIosSend />
          </button>
        </div>
      </div>
    </form>
  );
}

export default TypeInput;

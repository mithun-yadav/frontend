import { useEffect, useRef } from "react";
import { userMessage } from "../../assets/types/commonInterfaces";
import Loading from "../../components/Loading";
import useGetMessage from "../../context/useGetMessage";
import Message from "./Message";
import TypeInput from "./TypeInput";

function Messages() {
  const { messages, isLoading } = useGetMessage();
  const messagesArray = messages?.messages || [];
  const lastMessageRef = useRef(null);
  console.log(messagesArray, "jj");

  useEffect(() => {
    setTimeout(() => {
      if (lastMessageRef.current) {
        (lastMessageRef.current as HTMLElement)?.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  });
  return (
    <>
      <div className="noScrollBar px-5 py-4 overflow-y-auto h-[84vh]">
        {isLoading ? (
          <Loading />
        ) : Array.isArray(messagesArray) && messagesArray.length > 0 ? (
          messagesArray.map((message: userMessage) => (
            <div key={message._id} ref={lastMessageRef}>
              <Message userMessage={message} />
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-[100%]">
            <p className="font-sans font-bold text-2xl">"Say Hi 👋"</p>
          </div>
        )}
      </div>
      <TypeInput />
    </>
  );
}

export default Messages;

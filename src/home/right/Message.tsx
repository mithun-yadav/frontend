import { userMessage } from "../../assets/types/commonInterfaces";

function Message({ userMessage }: { userMessage: userMessage }) {
  console.log(userMessage, "message");
  const authUser = JSON.parse(localStorage.getItem("Messanger") || "{}");
  const isSameUser = userMessage?.senderId === authUser?.user?._id;
  const chatName = isSameUser ? "chat-end" : "chat-start";
  const chatColor = isSameUser ? "chat-bubble-success" : "chat-bubble-accent";
  return (
    <>
      <div className={`chat ${chatName}`}>
        <div className={`chat-bubble ${chatColor}`}>{userMessage?.message}</div>
      </div>
      {/* <div className="chat chat-end">
        <div className={`chat-bubble ${chatColor}`}>
          That's never been done in the history of the Jedi. It's insulting!
        </div>
      </div> */}
    </>
  );
}

export default Message;

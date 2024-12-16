import ChatUser from "./ChatUser";
import Messages from "./Messages";

function Right() {
  return (
    <div className="flex-[4] ">
      <ChatUser />
      <Messages />
    </div>
  );
}

export default Right;

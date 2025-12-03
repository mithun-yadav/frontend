import { useAuth } from "../../context/AuthProvider";
import useConversation from "../../stateManage/useConversation";
import ChatUser from "./ChatUser";
import Messages from "./Messages";
import Nouser from "./Nouser";

function Right() {
  const { selectedConversation } = useConversation();
  const { authUser } = useAuth();
  return (
    <div className="flex-[4] ">
      {!selectedConversation ? (
        <Nouser userName={authUser?.user?.name ?? ""} />
      ) : (
        <>
          <ChatUser />
          <Messages />
        </>
      )}
    </div>
  );
}

export default Right;

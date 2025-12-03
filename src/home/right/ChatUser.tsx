import { useMemo } from "react";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../stateManage/useConversation";
import Logout from "../left/Logout";
function ChatUser() {
  const { selectedConversation } = useConversation();
  const { onLineUsers } = useSocketContext();
  const isOnline = useMemo(
    () => onLineUsers.find((user) => user === selectedConversation?._id),
    [onLineUsers, selectedConversation]
  );
  console.log(selectedConversation, "selectedConversation");
  return (
    <div className="h-[9vh] overflow-hidden bg-slate-800">
      {selectedConversation ? (
        <div className="flex justify-between items-center pr-5">
          <div className="flex space-x-5 p-5">
            <div className={`avatar ${isOnline ? "online" : ""}`}>
              <div className="w-16 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div>
              <p className="text-xl font-bold">{selectedConversation?.name}</p>
              <p className="text-sm">{isOnline ? "Online" : "Offline"}</p>
            </div>
          </div>
          <div className="text-3xl">
            <Logout />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ChatUser;

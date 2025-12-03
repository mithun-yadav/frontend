import { useMemo } from "react";
import { UserType } from "../../assets/types/commonInterfaces";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../stateManage/useConversation";
function User({ userInfo }: { userInfo: UserType }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === userInfo?._id;
  const { socket, onLineUsers } = useSocketContext();
  console.log(socket, onLineUsers, "server");
  const isOnline = useMemo(
    () => onLineUsers.find((user) => user === userInfo._id),
    [onLineUsers, userInfo]
  );
  console.log(userInfo._id, onLineUsers, isOnline, "online");
  return (
    <div
      className={`cursor-pointer px-5 hover:bg-slate-500 duration-300 ${
        isSelected ? "bg-slate-600" : ""
      }`}
      onClick={() => {
        if (selectedConversation?._id !== userInfo?._id) {
          setSelectedConversation(userInfo);
        }
      }}
    >
      <div className="py-5 flex border-b-[1px] border-slate-700 justify-between">
        <div className="flex space-x-5">
          <div className={`avatar ${isOnline ? "online" : ""}`}>
            <div className="w-12 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div>
            <p className="text-base font-bold">{userInfo.name}</p>
            <p className="text-sm">Last Message</p>
          </div>
        </div>
        <div>
          <span className="text-sm">3:23 PM</span>
        </div>
      </div>
    </div>
  );
}

export default User;

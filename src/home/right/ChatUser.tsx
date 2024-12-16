function ChatUser() {
  return (
    <div className="h-[9vh] overflow-hidden">
      <div className="flex space-x-5 p-5">
        <div className="avatar online">
          <div className="w-16 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div>
          <p className="text-xl font-bold">Name</p>
          <p className="text-sm">Online</p>
        </div>
      </div>
    </div>
  );
}

export default ChatUser;

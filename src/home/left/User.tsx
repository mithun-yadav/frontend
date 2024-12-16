function User() {
  return (
    <div className="px-5">
      <div className="py-5 flex border-b-[1px] border-slate-700 justify-between">
        <div className="flex space-x-5">
          <div className="avatar offline">
            <div className="w-12 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div>
            <p className="text-base font-bold">Name</p>
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

function Nouser({ userName }: { userName: string }) {
  return (
    <div className="flex justify-center items-center h-[100%]">
      <p className="font-bold">
        Welcome {` ${userName} `} 🤗 Select a contact to start messaging
      </p>
    </div>
  );
}

export default Nouser;

import axios from "axios";
import SearchBox from "./SearchBox";
import User from "./User";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { UserType } from "../../assets/types/commonInterfaces";
import { useSocketContext } from "../../context/SocketContext";

function Left() {
  const getAllUserDataFun = async (): Promise<UserType[]> => {
    const token =
      Cookies.get("jwt") ||
      (localStorage.getItem("authUser")
        ? JSON.parse(localStorage.getItem("authUser")!).accessToken
        : null);
    console.log(token, "token");
    const response = await axios.get<UserType[]>("/api/user/getUserProfile", {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  };

  const { data: allUser } = useQuery({
    queryKey: ["get-all-user"],
    queryFn: getAllUserDataFun,
    refetchOnMount: true,
  });

  const { socket, onLineUsers } = useSocketContext();
  console.log(allUser, socket, onLineUsers, "server");

  return (
    <div className="flex-[1] bg-slate-900">
      <SearchBox />
      <div className="noScrollBar h-[91vh] overflow-y-auto">
        {allUser?.map((item, index) => {
          return <User key={index} userInfo={item} />;
        })}
      </div>
    </div>
  );
}

export default Left;

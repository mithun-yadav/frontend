import axios from "axios";
import SearchBox from "./SearchBox";
import User from "./User";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { UserType } from "../../assets/types/commonInterfaces";

function Left() {
  const getAllUserDataFun = async (): Promise<UserType[]> => {
    const token = Cookies.get("jwt");
    const response = await axios.get<UserType[]>("api/user/getUserProfile", {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const { data: allUser, isLoading } = useQuery({
    queryKey: ["get-all-user"],
    queryFn: getAllUserDataFun,
  });

  console.log(allUser, isLoading, "val");
  // <span className="loading loading-infinity loading-lg"></span>

  return (
    <div className="flex-[1]">
      <SearchBox />
      <div className="noScrollBar h-[91vh] overflow-y-auto">
        {/* {Array.from({ length: 15 }).map((_, index) => {
          return <User key={index} />;
        })} */}
        {allUser?.map((item, index) => {
          return <User key={index} userInfo={item} />;
        })}
      </div>
    </div>
  );
}

export default Left;

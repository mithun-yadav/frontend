import axios from "axios";
import SearchBox from "./SearchBox";
import User from "./User";
import { useQuery } from "@tanstack/react-query";

interface ApiResponse {
  data: [];
  status: number;
}

function Left() {
  const getAllUserDataFun = async (): Promise<ApiResponse> => {
    const response = await axios.get<ApiResponse>(
      "http://localhost:5002/user/getUserProfile"
    );
    return response.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["get-all-user"],
    queryFn: getAllUserDataFun,
  });

  console.log(data, isLoading);

  return (
    <div className="flex-[1]">
      <SearchBox />
      <div className="noScrollBar h-[91vh] overflow-y-auto">
        {Array.from({ length: 15 }).map((_, index) => {
          return <User key={index} />;
        })}
      </div>
    </div>
  );
}

export default Left;

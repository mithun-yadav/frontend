import axios from "axios";
import useConversation from "../stateManage/useConversation.js";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

function useGetMessage() {
  const { messages, setMessages, selectedConversation } = useConversation();

  const { data, isLoading, error } = useQuery({
    queryKey: ["get_messages", selectedConversation?._id],
    queryFn: async () => {
      if (!selectedConversation?._id) return [];
      const token =
        Cookies.get("jwt") ||
        JSON.parse(localStorage.getItem("authUser")!).accessToken;

      if (!token) {
        console.log("No token found. Api request will fail");
        throw new Error("No access token available");
      }
      try {
        const res = await axios.get(
          `api/message/get/${selectedConversation?._id}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
              "content-type": "application/json",
            },
          }
        );
        const resData = res.data;
        console.log("resData", resData);

        setMessages(resData);
        return resData;
      } catch (error) {
        console.error("Error fetching messages:", error);
        throw error;
      }
    },
    enabled: !!selectedConversation?._id,
  });

  console.log(data, selectedConversation?._id, "data");

  return { messages, isLoading, error };
}

export default useGetMessage;

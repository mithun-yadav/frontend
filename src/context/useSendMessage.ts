import { useMutation } from "@tanstack/react-query";
import useConversation from "../stateManage/useConversation";
import axios from "axios";
import Cookies from "js-cookie";

function useSendMessage() {
  const { messages, setMessages, selectedConversation } = useConversation();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["send_Message", selectedConversation?._id],
    mutationFn: async (message: string) => {
      if (!selectedConversation?._id)
        throw new Error("No conversation selected");

      // Retrieve token
      const token =
        Cookies.get("jwt") ||
        (localStorage.getItem("authUser")
          ? JSON.parse(localStorage.getItem("authUser")!).accessToken
          : null);

      console.log("🔍 Sending Token:", token); // Debugging

      if (!token) {
        console.error("⚠️ No token found, API request will fail.");
        throw new Error("Access token missing");
      }

      // Send request with Authorization header
      const res = await axios.post(
        `/api/message/send/${selectedConversation?._id}`,
        { message },
        {
          withCredentials: true, // Ensures cookies are sent
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Ensures token is passed
            "Content-Type": "application/json",
          },
        }
      );

      return res.data;
    },
    onSuccess: (data) => {
      setMessages({
        messages: {
          messages: [...(messages?.messages?.messages || []), ...data.messages],
        },
      });
    },
    onError: (error) => {
      console.log("❌ Error sending messages:", error);
    },
  });

  return { mutate, isPending, error };
}

export default useSendMessage;

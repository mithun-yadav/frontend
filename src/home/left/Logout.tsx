import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import Cookies from "js-cookie";
import { useAuth } from "../../context/AuthProvider";

function Logout() {
  const { setAuthUser } = useAuth();
  const callApiLogout = async () => {
    const res = await axios.post("/api/user/logout");
    return res;
  };

  const { mutate } = useMutation({
    mutationKey: ["logout_key"],
    mutationFn: callApiLogout,
    onSuccess: () => {
      localStorage.removeItem("Messanger");
      Cookies.remove("jwt");
      setAuthUser(undefined);
      alert("Logout Successfully");
    },
  });

  const handleLogout = () => {
    mutate(); // Call mutate without any arguments
  };

  return (
    <div className="cursor-pointer" onClick={handleLogout}>
      <AiOutlineLogout />
    </div>
  );
}

export default Logout;

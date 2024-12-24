import React from "react";
import { Button } from "../index";
import auth from "../../appwrite/authService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/authSlice";
import { FaSignOutAlt } from "react-icons/fa";

export default function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const logedOut = await auth.logOut();
    if (logedOut) {
      dispatch(logout());
      navigate("/login");
    }
  };

  return (
    <Button
      onClick={handleLogout}
      bgColor="bg-transparent"
      myClass="hover:bg-amber-700 text-md flex justify-start gap-2"
      padding="p-4"
    >
      <FaSignOutAlt size={22} />
      Logout
    </Button>
  );
}

import React from "react";
import { Button } from "../index";
import auth from "../../appwrite/authService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/authSlice";

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

  return <Button onClick={handleLogout}>Logout</Button>;
}

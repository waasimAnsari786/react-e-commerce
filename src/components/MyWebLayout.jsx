import React, { useEffect } from "react";
import { Header, Footer, Admin } from "./index";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import auth from "../appwrite/authService";
import userRole from "../appwrite/userRoleService";
import { getProductsThunk } from "../features/productSlice";
import { getCartItemsThunk } from "../features/userAddToCartSlice";
import { getAllImagesThunk } from "../features/fileSlice";
import { login } from "../features/authSlice";
import { getCategoriesThunk } from "../features/catogorySlice";
import { getOrdersThunk } from "../features/ordersSlice";
import { getAllProfileImagesThunk } from "../features/profileImagesSlice";

export default function MyWebLayout() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUser = async () => {
    const getedUser = await auth.getCurrentUser();
    if (getedUser) {
      const getedUserRole = await userRole.getUserRole(getedUser.$id);
      getedUser.userRole = getedUserRole.documents[0]?.role;
      getedUser.profileImage = getedUserRole.documents[0]?.profileImage;
      getedUser.userRoleId = getedUserRole.documents[0]?.$id;
      dispatch(login(getedUser));
      if (getedUserRole && getedUserRole.documents[0].role === "Admin") {
        dispatch(
          getProductsThunk({ queryKey: "adminId", queryVal: userData.$id })
        );
        dispatch(
          getCartItemsThunk({ queryKey: "adminId", queryVal: userData.$id })
        );
        dispatch(getOrdersThunk(userData.$id));
        navigate("/admin/dashboard");
      } else if (getedUserRole && getedUserRole.documents[0].role === "Buyer") {
        dispatch(getProductsThunk());
        dispatch(getCartItemsThunk({ queryVal: userData.$id }));
        navigate("/");
      }
    }
  };

  const getData = () => {
    if (userData) {
      dispatch(getAllImagesThunk());
      dispatch(getAllProfileImagesThunk());
      dispatch(getCategoriesThunk());
    }
  };

  useEffect(() => {
    getUser();
    getData();
  }, [authStatus]);

  if (userData && userData.userRole === "Admin") {
    return (
      <>
        <Admin />
      </>
    );
  } else {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    );
  }
}

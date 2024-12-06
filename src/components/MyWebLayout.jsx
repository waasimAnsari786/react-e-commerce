import React, { useEffect } from "react";
import { Header, Footer } from "./index";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import auth from "../appwrite/authService";
import userRole from "../appwrite/userRoleService";
import { getProductsThunk } from "../features/productSlice";
import { getCartItemsThunk } from "../features/userAddToCartSlice";
import { getAllImagesThunk } from "../features/fileSlice";
import { login } from "../features/authSlice";
import { getCategoriesThunk } from "../features/catogorySlice";

export default function MyWebLayout() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUser = async () => {
    const getedUser = await auth.getCurrentUser();
    if (getedUser) {
      const getedUserRole = await userRole.getUserRole(getedUser.email);
      getedUser.userRole = getedUserRole.documents[0].role;
      dispatch(login(getedUser));
      if (getedUserRole && getedUserRole.documents[0].role === "Admin") {
        dispatch(
          getProductsThunk({ queryKey: "userId", queryVal: userData.$id })
        );
        navigate("/admin/dashboard");
      } else if (getedUserRole && getedUserRole.documents[0].role === "Buyer") {
        dispatch(getProductsThunk());
        navigate("/");
      }
    }
  };

  const getData = () => {
    if (userData) {
      dispatch(getCartItemsThunk(userData.$id));
      dispatch(getAllImagesThunk());
      dispatch(getCategoriesThunk());
    }
  };

  useEffect(() => {
    getUser();
    getData();
  }, [authStatus]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
// if (userData && userData.userRole === "Buyer") {
//   return (
//     <>
//       <Header />
//       <Outlet />
//       <Footer />
//     </>
//   );
// } else if (userData && userData.userRole === "Admin") {
//   return (
//     <>
//       <Outlet />
//     </>
//   );
// }

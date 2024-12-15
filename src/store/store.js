import { configureStore } from "@reduxjs/toolkit";
import authSliceReducers from "../features/authSlice";
import productSliceReducers from "../features/productSlice";
import fileSliceReducers from "../features/fileSlice";
import cartSliceReducers from "../features/userAddToCartSlice";
import catogReducers from "../features/catogorySlice";
import orderReducer from "../features/ordersSlice";
import profileImageReducers from "../features/profileImagesSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducers,
    product: productSliceReducers,
    file: fileSliceReducers,
    cart: cartSliceReducers,
    category: catogReducers,
    orders: orderReducer,
    profileImage: profileImageReducers,
  },
});

export default store;

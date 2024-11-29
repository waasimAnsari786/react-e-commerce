import { configureStore } from "@reduxjs/toolkit";
import authSliceReducers from "../features/authSlice";
import productSliceReducers from "../features/productSlice";
import fileSliceReducers from "../features/fileSlice";
import cartSliceReducers from "../features/userAddToCartSlice";
import catogReducers from "../features/catogorySlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducers,
    product: productSliceReducers,
    file: fileSliceReducers,
    cart: cartSliceReducers,
    category: catogReducers,
  },
});

export default store;

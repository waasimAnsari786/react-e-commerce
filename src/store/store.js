import { configureStore } from "@reduxjs/toolkit";
import authSliceReducers from "../features/authSlice";
import productSliceReducers from "../features/productSlice";
// import fileSliceReducers from "../features/fileSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducers,
    product: productSliceReducers,
    // file: fileSliceReducers,
  },
});

export default store;

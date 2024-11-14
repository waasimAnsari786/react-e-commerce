import { configureStore } from "@reduxjs/toolkit";
import authSliceReducers from "../features/authSlice";
// import postSliceReducers from "../features/postSlice";
// import fileSliceReducers from "../features/fileSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducers,
    // post: postSliceReducers,
    // file: fileSliceReducers,
  },
});

export default store;

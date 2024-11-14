// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import postService from "../appwrrite/postService";

// const initialState = {
//   filteredPost: {},
//   postsArr: [],
//   loading: true,
//   error: null,
// };

// export const createPostThunk = createAsyncThunk(
//   "post/createPost",
//   async (postData, { rejectWithValue }) => {
//     try {
//       const createdPost = await postService.createPost(postData);
//       if (createdPost) {
//         const getedPosts = await postService.getPosts();
//         return getedPosts;
//       }
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const getPostsThunk = createAsyncThunk(
//   "post/getPosts",
//   async (_, { rejectWithValue }) => {
//     try {
//       const getedPosts = await postService.getPosts();
//       return getedPosts;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const deletePostThunk = createAsyncThunk(
//   "post/deletePost",
//   async (docID, { rejectWithValue }) => {
//     try {
//       const deletedPost = await postService.deletePost(docID);
//       return deletedPost;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const updatePostThunk = createAsyncThunk(
//   "post/updatePost",
//   async (postdata, { rejectWithValue }) => {
//     try {
//       const updatedPost = await postService.updatePost(postdata);
//       if (updatedPost) {
//         const getedPosts = await postService.getPosts();
//         if (getedPosts) {
//           return [updatedPost, getedPosts];
//         }
//       }
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const postSlice = createSlice({
//   name: "post",
//   initialState,
//   reducers: {
//     postFilter: (state, action) => {
//       let getedPost = state.postsArr.find(
//         (post) => post.slug === action.payload
//       );
//       state.filteredPost = getedPost;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createPostThunk.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createPostThunk.fulfilled, (state, action) => {
//         state.loading = false;
//         state.postsArr = action.payload.documents;
//       })
//       .addCase(createPostThunk.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(getPostsThunk.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getPostsThunk.fulfilled, (state, action) => {
//         state.loading = false;
//         state.postsArr = action.payload.documents;
//       })
//       .addCase(getPostsThunk.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(deletePostThunk.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deletePostThunk.fulfilled, (state) => {
//         state.loading = false;
//       })
//       .addCase(deletePostThunk.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(updatePostThunk.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updatePostThunk.fulfilled, (state, action) => {
//         state.loading = false;
//         state.postsArr = action.payload[1].documents;
//       })
//       .addCase(updatePostThunk.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default postSlice.reducer;
// export const { postFilter } = postSlice.actions;

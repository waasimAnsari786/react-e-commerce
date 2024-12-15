import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import profileImageService from "../appwrite/profileImagesService";

const initialState = {
  profileImageObj: "",
  preview_URL_Arr: [],
  loading: true,
  error: null,
};

const uploadProfileImageThunk = createAsyncThunk(
  "profileImage/upload",
  async (file, { rejectWithValue, dispatch }) => {
    try {
      const uploadedFile = await profileImageService.uploadProfileImage(file);
      if (uploadedFile) {
        await dispatch(getAllProfileImagesThunk());
      }
      return uploadedFile;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const deleteProfileImageThunk = createAsyncThunk(
  "profileImage/delete",
  async (fileId, { rejectWithValue }) => {
    try {
      const fileDeleted = await profileImageService.deleteProfileImage(fileId);
      if (fileDeleted) return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const getAllProfileImagesThunk = createAsyncThunk(
  "profileImage/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const allProfileImages = await profileImageService.getAllProfileImages();
      if (allProfileImages) {
        const previewArr = allProfileImages.files.map((file) => ({
          URL: profileImageService.getProfileImagePreview(file.$id),
          fileId: file.$id,
        }));
        return previewArr;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const profileImageSlice = createSlice({
  name: "profileImage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadProfileImageThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProfileImageThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.profileImageObj = action.payload;
      })
      .addCase(uploadProfileImageThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllProfileImagesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProfileImagesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.preview_URL_Arr = action.payload || [];
      })
      .addCase(getAllProfileImagesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profileImageSlice.reducer;
export {
  uploadProfileImageThunk,
  deleteProfileImageThunk,
  getAllProfileImagesThunk,
};

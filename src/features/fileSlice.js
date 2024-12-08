import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fileService from "../appwrite/fileService";

const initialState = {
  fileObj: "",
  preview_URL_Arr: [],
  loading: true,
  error: null,
};

const fileUploadThunk = createAsyncThunk(
  "file/fileUpload",
  async (file, { rejectWithValue, dispatch }) => {
    try {
      const uploadedFile = await fileService.uploadFile(file);
      if (uploadedFile) {
        await dispatch(getAllImagesThunk());
      }
      return uploadedFile;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const deleteUploadThunk = createAsyncThunk(
  "file/fileDelete",
  async (fileId, { rejectWithValue }) => {
    try {
      const fileDeleted = await fileService.deleteImage(fileId);
      if (fileDeleted) return true;
    } catch (error) {
      return rejectWithValue(error.messsage);
    }
  }
);

const getAllImagesThunk = createAsyncThunk(
  "file/getImages",
  async (_, { rejectWithValue }) => {
    try {
      const getAllImagesObj = await fileService.getAllFiles();
      if (getAllImagesObj) {
        const previewArr = getAllImagesObj.files.map((preview) => {
          return {
            URL: fileService.getPreviewFile(preview.$id),
            fileId: preview.$id,
          };
        });
        return previewArr;
      }
    } catch (error) {
      return rejectWithValue(error.messsage);
    }
  }
);

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fileUploadThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fileUploadThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.fileObj = action.payload;
      })
      .addCase(fileUploadThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllImagesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllImagesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.preview_URL_Arr = action.payload;
      })
      .addCase(getAllImagesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default fileSlice.reducer;
export { fileUploadThunk, deleteUploadThunk, getAllImagesThunk };

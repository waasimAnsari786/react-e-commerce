import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryService from "../appwrite/catogoriesService";

const initialState = {
  categoriesArr: [],
  filteredCategory: {},
  loading: true,
  error: null,
};

// Thunk to add a category
export const addCategoryThunk = createAsyncThunk(
  "category/addCategory",
  async (categoryData, { rejectWithValue, dispatch }) => {
    try {
      const addedCategory = await categoryService.createCategory(categoryData);
      if (addedCategory) {
        await dispatch(getCategoriesThunk());
      }
      return addedCategory;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to fetch all categories
export const getCategoriesThunk = createAsyncThunk(
  "category/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const fetchedCategories = await categoryService.getCategories();
      return fetchedCategories;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to remove a category
export const removeCategoryThunk = createAsyncThunk(
  "category/removeCategory",
  async (categoryId, { rejectWithValue, dispatch }) => {
    try {
      const removedCategory = await categoryService.deleteCategory(categoryId);
      if (removedCategory) {
        await dispatch(getCategoriesThunk());
      }
      return removedCategory;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to update a category
export const updateCategoryThunk = createAsyncThunk(
  "category/updateCategory",
  async (categoryData, { rejectWithValue, dispatch }) => {
    try {
      const updatedCategory = await categoryService.updateCategory(
        categoryData
      );
      if (updatedCategory) {
        await dispatch(getCategoriesThunk());
      }
      return updatedCategory;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    findCategory: (state, action) => {
      let catog = state.categoriesArr.find(
        (catog) => catog.catogSlug === action.payload
      );
      state.filteredCategory = catog;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Category
      .addCase(addCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategoryThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Categories
      .addCase(getCategoriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategoriesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categoriesArr = action.payload.documents;
      })
      .addCase(getCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove Category
      .addCase(removeCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCategoryThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removeCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Category
      .addCase(updateCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategoryThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
export const { findCategory } = categorySlice.actions;

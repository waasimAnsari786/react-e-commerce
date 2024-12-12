import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryService from "../appwrite/catogoriesService";
import { toast } from "react-toastify";

const initialState = {
  categoriesArr: [],
  filteredCategory: {},
  catogNames: [],
  updatedArrOfCatog: [],
  loading: true,
  error: null,
};

// Thunk to add a category
export const addCategoryThunk = createAsyncThunk(
  "category/addCategory",
  async (categoryData, { rejectWithValue, dispatch }) => {
    try {
      if (!categoryData.parentCatog) {
        const addedCategory = await categoryService.createCategory(
          categoryData
        );
        if (addedCategory) {
          await dispatch(getCategoriesThunk());
          return addedCategory;
        }
      } else {
        const categories = await dispatch(getCategoriesThunk()).unwrap();
        let parentCategory = categories.documents.find(
          (category) => category.catogName === categoryData.parentCatog
        );

        let updatedParentCategory = {
          ...parentCategory,
          subCatogs: [...parentCategory.subCatogs, categoryData.catogName],
        };
        const updatedCategory = await categoryService.updateCategory(
          updatedParentCategory
        );
        const addedCategory = await categoryService.createCategory(
          categoryData
        );

        if (addedCategory && updatedCategory) {
          await dispatch(getCategoriesThunk());
          return addedCategory;
        }
      }
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
  async (category, { rejectWithValue, dispatch }) => {
    try {
      if (category.subCatogs.length > 0) {
        const categories = await dispatch(getCategoriesThunk()).unwrap();
        let subCatog;
        for (let index = 0; index < category.subCatogs.length; index++) {
          subCatog = categories.documents.find(
            (catog) => catog.catogName === category.subCatogs[index]
          );
          let newObj = { ...subCatog, parentCatog: "" };
          const updatedCategory = await categoryService.updateCategory(newObj);
        }
      }
      if (category.parentCatog) {
        const categories = await dispatch(getCategoriesThunk()).unwrap();
        let parentCategory = categories.documents.find(
          (catog) => catog.catogName === category.parentCatog
        );
        let updatedSubCatogs = parentCategory.subCatogs.filter(
          (catog) => catog !== category.catogName
        );
        let updatedParentCategory = {
          ...parentCategory,
          subCatogs: updatedSubCatogs,
        };
        const updatedCategory = await categoryService.updateCategory(
          updatedParentCategory
        );
      }

      const deletedCategory = await categoryService.deleteCategory(
        category.$id
      );
      if (deletedCategory) {
        await dispatch(getCategoriesThunk());
        return deletedCategory;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to update a category
export const updateCategoryThunk = createAsyncThunk(
  "category/updateCategory",
  async (
    { oldData, newData } = categoryData,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const categories = await dispatch(getCategoriesThunk()).unwrap();
      if (oldData.parentCatog) {
        let oldParentCategory = categories.documents.find(
          (catog) => catog.catogName === oldData.parentCatog
        );
        let updatedOldParentCategory = {
          ...oldParentCategory,
          subCatogs: oldParentCategory.subCatogs.filter(
            (catog) => catog !== oldData.catogName
          ),
        };
        const updatedOldParentCategoryDatabase =
          await categoryService.updateCategory(updatedOldParentCategory);
      }
      if (newData.parentCatog) {
        let newParentCategory = categories.documents.find(
          (catog) => catog.catogName === newData.parentCatog
        );
        let updatedNewParentCategory = {
          ...newParentCategory,
          subCatogs: [
            ...newParentCategory.subCatogs.filter(
              (catog) => catog !== oldData.catogName
            ),
            newData.catogName,
          ],
        };
        const updatedNewParentCategoryDatabase =
          await categoryService.updateCategory(updatedNewParentCategory);
      }

      const updatedCategory = categoryService.updateCategory({
        ...oldData,
        ...newData,
      });
      if (updatedCategory) {
        return updatedCategory;
      }
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
        state.categoriesArr = action.payload.documents || [];
        state.catogNames = state.categoriesArr.map(
          (curObj) => curObj.catogName
        );
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

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryService from "../appwrite/catogoriesService";
import { updateProductThunk } from "./productSlice";
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
  async (categoryData, { rejectWithValue, dispatch, getState }) => {
    try {
      const { categoriesArr } = getState().category;

      const isCategory = categoriesArr.some(
        (category) => category.catogName === categoryData.catogName
      );

      if (isCategory) {
        toast.info(
          "You can't add this category because it's already exists in your data. However, you can update it."
        );
        return rejectWithValue("Category already exists.");
      }

      if (!categoryData.parentCatog) {
        const addedCategory = await categoryService.createCategory(
          categoryData
        );
        if (addedCategory) {
          dispatch(getCategoriesThunk());
          return addedCategory;
        }
      } else {
        let parentCategory = categoriesArr.find(
          (category) => category.catogName === categoryData.parentCatog
        );

        if (parentCategory) {
          const updatedParentCategory = {
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
            dispatch(getCategoriesThunk());
            return addedCategory;
          }
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
  async (category, { rejectWithValue, dispatch, getState }) => {
    try {
      const { categoriesArr } = getState().category;
      const { productsArr } = getState().product;

      // Update child categories' parent
      if (category.subCatogs.length > 0) {
        for (const subCatogName of category.subCatogs) {
          const subCatog = categoriesArr.find(
            (catog) => catog.catogName === subCatogName
          );

          if (subCatog) {
            const updatedSubCatog = { ...subCatog, parentCatog: "" };
            await categoryService.updateCategory(updatedSubCatog);
          }
        }
      }

      // Update parent category's subCatogs
      if (category.parentCatog) {
        const parentCategory = categoriesArr.find(
          (catog) => catog.catogName === category.parentCatog
        );

        if (parentCategory) {
          const updatedParentCategory = {
            ...parentCategory,
            subCatogs: parentCategory.subCatogs.filter(
              (catog) => catog !== category.catogName
            ),
          };

          await categoryService.updateCategory(updatedParentCategory);
        }
      }

      const deletedCategory = await categoryService.deleteCategory(
        category.$id
      );

      if (deletedCategory) {
        const products = productsArr.map((product) => {
          if (product.pParentCategory.includes(category.catogName)) {
            const newArr = product.pParentCategory.filter(
              (catog) => catog !== category.catogName
            );

            newArr.length === 0 ? newArr.push("Uncategorise") : newArr;

            const duplicatedProduct = {
              ...product,
              pParentCategory: newArr,
            };
            dispatch(updateProductThunk(duplicatedProduct));
          }
        });
        dispatch(getCategoriesThunk());
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
  async ({ oldData, newData }, { rejectWithValue, dispatch, getState }) => {
    try {
      const { categoriesArr } = getState().category;
      const { productsArr } = getState().product;

      // Extract keys from the data object
      const keysFromNewData = Object.keys(newData);

      const isCategory = categoriesArr.some((category) =>
        keysFromNewData.every(
          (key) => newData[key]?.toLowerCase() === category[key]?.toLowerCase()
        )
      );

      if (isCategory) {
        toast.error(
          "You can't update this category because it's already exists in your data"
        );
        return rejectWithValue("Category already exists.");
      }

      // Remove category from old parent
      if (oldData.parentCatog) {
        const oldParentCategory = categoriesArr.find(
          (catog) => catog.catogName === oldData.parentCatog
        );

        if (oldParentCategory) {
          const updatedOldParent = {
            ...oldParentCategory,
            subCatogs: oldParentCategory.subCatogs.filter(
              (catog) => catog !== oldData.catogName
            ),
          };
          await categoryService.updateCategory(updatedOldParent);
        }
      }

      // Add category to new parent
      if (newData.parentCatog) {
        const newParentCategory = categoriesArr.find(
          (catog) => catog.catogName === newData.parentCatog
        );

        if (newParentCategory) {
          const updatedNewParent = {
            ...newParentCategory,
            subCatogs: [
              ...newParentCategory.subCatogs.filter(
                (catog) => catog !== oldData.catogName
              ),
              newData.catogName,
            ],
          };
          await categoryService.updateCategory(updatedNewParent);
        }
      }

      if (oldData.subCatogs.length > 0) {
        for (const subCatogName of oldData.subCatogs) {
          const subCatog = categoriesArr.find(
            (catog) => catog.catogName === subCatogName
          );

          if (subCatog) {
            const updatedSubCatog = {
              ...subCatog,
              parentCatog: newData.catogName,
            };
            await categoryService.updateCategory(updatedSubCatog);
          }
        }
      }

      const updatedCategory = await categoryService.updateCategory({
        ...oldData,
        ...newData,
      });

      if (updatedCategory) {
        const products = productsArr.map((product) => {
          if (product.pParentCategory.includes(oldData.catogName)) {
            const duplicatedProduct = {
              ...product,
              pParentCategory: [
                ...product.pParentCategory.filter(
                  (catog) => catog !== oldData.catogName
                ),
                newData.catogName,
              ],
            };
            dispatch(updateProductThunk(duplicatedProduct));
          }
        });

        dispatch(getCategoriesThunk());
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
      const catog = state.categoriesArr.find(
        (catog) => catog.$id === action.payload
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
        state.catogNames = state.categoriesArr.map((catog) => catog.catogName);
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

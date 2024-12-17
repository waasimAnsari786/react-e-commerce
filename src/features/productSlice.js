import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "../appwrite/productService";
import file from "../appwrite/fileService";

const initialState = {
  filteredProduct: {},
  productsArr: [],
  loading: true,
  error: null,
};

export const createProductThunk = createAsyncThunk(
  "product/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const createdProduct = await productService.createProduct(productData);
      return createdProduct && createdProduct;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getProductsThunk = createAsyncThunk(
  "product/getProducts",
  async (queryData, { rejectWithValue }) => {
    try {
      const fetchedProducts = await productService.getProducts(
        queryData && queryData.queryKey,
        queryData && queryData.queryVal
      );
      return fetchedProducts && fetchedProducts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProductThunk = createAsyncThunk(
  "product/deleteProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const deletedImg = await file.deleteImage(productData.pImage);
      if (deletedImg) {
        const deletedProduct = await productService.deleteProduct(
          productData.$id
        );
        return deletedProduct && productData.$id;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProductThunk = createAsyncThunk(
  "product/updateProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const updatedProduct = await productService.updateProduct(productData);
      return updatedProduct && updatedProduct;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productFilter: (state, action) => {
      let fetchedProduct = state.productsArr.find(
        (product) => product.pSlug === action.payload
      );
      state.filteredProduct = fetchedProduct;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.productsArr.unshift(action.payload);
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.productsArr = action.payload.documents || [];
      })
      .addCase(getProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.productsArr = state.productsArr.filter(
          (product) => product.$id !== action.payload
        );
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        // let { productsArr } = state;
        state.loading = false;
        state.productsArr.map((product) =>
          product.$id === action.payload.$id ? action.payload : product
        );
        // const index = productsArr.findIndex(
        //   (item) => item.$id === action.payload.$id
        // );
        // productsArr.splice(index, 1, action.payload);
      })
      .addCase(updateProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
export const { productFilter } = productSlice.actions;

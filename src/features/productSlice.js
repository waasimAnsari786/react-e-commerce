import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "../appwrite/productService";

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
      if (createdProduct) {
        const fetchedProducts = await dispatch(getProductsThunk()).unwrap();
        // if (fetchedProducts) {
        //   return [createdProduct, fetchedProducts];
        // }
        // const fetchedProducts = await productService.getProducts();
        // return fetchedProducts;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getProductsThunk = createAsyncThunk(
  "product/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const fetchedProducts = await productService.getProducts();
      return fetchedProducts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProductThunk = createAsyncThunk(
  "product/deleteProduct",
  async (docID, { rejectWithValue }) => {
    try {
      const deletedProduct = await productService.deleteProduct(docID);
      return deletedProduct;
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
      if (updatedProduct) {
        const fetchedProducts = await productService.getProducts();
        if (fetchedProducts) {
          return [updatedProduct, fetchedProducts];
        }
      }
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
        (product) => product.slug === action.payload
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
        // state.productsArr = action.payload.documents;
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
        state.productsArr = action.payload.documents;
      })
      .addCase(getProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductThunk.fulfilled, (state) => {
        state.loading = false;
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
        state.loading = false;
        // state.productsArr = action.payload[1].documents;
      })
      .addCase(updateProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
export const { productFilter } = productSlice.actions;

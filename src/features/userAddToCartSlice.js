import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import addToCartService from "../appwrite/userAddtoCartService";

const initialState = {
  cartItems: [],
  loading: true,
  error: null,
};

// Thunk to add an item to the cart
export const addToCartThunk = createAsyncThunk(
  "cart/addToCart",
  async (itemData, { rejectWithValue }) => {
    try {
      const addedItem = await addToCartService.createAddtoCart(itemData);
      return addedItem;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to fetch all cart items
export const getCartItemsThunk = createAsyncThunk(
  "cart/getCartItems",
  async (productData, { rejectWithValue }) => {
    try {
      const fetchedCartItems = await addToCartService.getAddToCarts(
        productData.queryKey,
        productData.queryVal
      );
      return fetchedCartItems;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to remove an item from the cart
export const removeFromCartThunk = createAsyncThunk(
  "cart/removeFromCart",
  async (itemData, { rejectWithValue }) => {
    try {
      const removedItem = await addToCartService.deleteAddToCart(itemData.$id);
      return itemData.$id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to update a cart item (e.g., quantity)
export const updateCartItemThunk = createAsyncThunk(
  "cart/updateCartItem",
  async (itemData, { rejectWithValue }) => {
    try {
      const updatedItem = await addToCartService.updateAddToCart(itemData);
      return updatedItem;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add to Cart
      .addCase(addToCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems.push(action.payload);
      })
      .addCase(addToCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Cart Items
      .addCase(getCartItemsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartItemsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.documents || [];
      })
      .addCase(getCartItemsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove From Cart
      .addCase(removeFromCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = state.cartItems.filter(
          (product) => product.$id !== action.payload
        );
      })
      .addCase(removeFromCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Cart Item
      .addCase(updateCartItemThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = state.cartItems.map((product) =>
          product.$id === action.payload.$id ? action.payload : product
        );
      })
      .addCase(updateCartItemThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;

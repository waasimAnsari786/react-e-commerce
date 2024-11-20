import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import addToCartService from "../appwrite/userAddtoCartService";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [],
  userCartItems: [],
  loading: true,
  error: null,
};

// Thunk to add an item to the cart
export const addToCartThunk = createAsyncThunk(
  "cart/addToCart",
  async (itemData, { rejectWithValue }) => {
    try {
      const addedItem = await addToCartService.createAddtoCart(itemData);
      if (addedItem) {
        toast.success("Product added to cart successfully!");
      }
      return addedItem;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to fetch all cart items
export const getCartItemsThunk = createAsyncThunk(
  "cart/getCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const fetchedCartItems = await addToCartService.getAddToCarts();
      return fetchedCartItems;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to remove an item from the cart
export const removeFromCartThunk = createAsyncThunk(
  "cart/removeFromCart",
  async (itemId, { rejectWithValue, dispatch }) => {
    try {
      const removedItem = await addToCartService.deleteAddToCart(itemId);
      // if (removedItem) {
      //   dispatch(getCartItemsThunk());
      // }
      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to update a cart item (e.g., quantity)
export const updateCartItemThunk = createAsyncThunk(
  "cart/updateCartItem",
  async (itemData, { rejectWithValue, dispatch }) => {
    try {
      const updatedItem = await addToCartService.updateAddToCart(itemData);
      if (updatedItem) {
        toast.success("Product has updated!");
        await dispatch(getCartItemsThunk());
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Reducer for filtering cart items (optional, if needed)
    updateUserCartItemsArr: (state, action) => {
      state.userCartItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to Cart
      .addCase(addToCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems.unshift(action.payload);
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
        state.cartItems = action.payload.documents;
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
          (item) => item.itemId !== action.payload
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
      })
      .addCase(updateCartItemThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
export const { updateUserCartItemsArr } = cartSlice.actions;

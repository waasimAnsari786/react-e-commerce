import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ordersService from "../appwrite/ordersService";

const initialState = {
  filteredOrder: {},
  orders: [],
  loading: true,
  error: null,
};

// Thunk to add an order
export const addOrderThunk = createAsyncThunk(
  "orders/addOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const addedOrder = await ordersService.createOrder(orderData);
      if (addedOrder) {
        return addedOrder;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteOrderThunk = createAsyncThunk(
  "orders/deleteOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const deletedOrder = await ordersService.deleteOrder(orderData);
      if (deletedOrder) {
        return orderData.$id;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateOrderThunk = createAsyncThunk(
  "orders/updateOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const updatedOrder = await ordersService.updateOrder(orderData);
      if (updatedOrder) {
        return updatedOrder;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to fetch all orders
export const getOrdersThunk = createAsyncThunk(
  "orders/getOrders",
  async (userId, { rejectWithValue }) => {
    try {
      const fetchedOrders = await ordersService.getOrders(userId);
      if (fetchedOrders) {
        return fetchedOrders.documents;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    findOrder: (state, action) => {
      state.filteredOrder = state.orders.find(
        (order) => order.$id === action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Order
      .addCase(addOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.unshift(action.payload);
      })
      .addCase(addOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // delete Order

      .addCase(deleteOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.filter((order) => order.$id !== action.payload);
      })
      .addCase(deleteOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // update Order

      .addCase(updateOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.map((order) =>
          order.$id === action.payload.$id ? action.payload : order
        );
      })
      .addCase(updateOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Orders
      .addCase(getOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload || [];
      })
      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
export const { findOrder } = orderSlice.actions;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}api/orders`;

// Helper to get the auth header with the token
const authHeader = () => {
  const token = localStorage.getItem('userToken');
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

// Thunk to create an order
export const createOrder = createAsyncThunk('orders/createOrder', async (orderData, { rejectWithValue }) => {
  try {
    const response = await axios.post(API_URL, orderData, authHeader());
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data.message : error.message);
  }
});

// Thunk to fetch all orders for the current user
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(API_URL, authHeader());
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data.message : error.message);
  }
});

// Thunk to fetch a specific order by ID
export const fetchOrderById = createAsyncThunk('orders/fetchOrderById', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, authHeader());
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data.message : error.message);
  }
});

// Thunk to update order status by ID
export const updateOrderStatus = createAsyncThunk('orders/updateOrderStatus', async ({ id, status }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/status`, { status }, authHeader());
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data.message : error.message);
  }
});

// Slice to manage orders state
const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    order: null,
    loading: false,
    error: '',
  },
  reducers: {
    clearOrder(state) {
      state.order = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch a specific order by ID
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create an order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update order status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex((order) => order._id === action.payload._id);
        if (index !== -1) {
          state.orders[index] = action.payload; // Update order status
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;

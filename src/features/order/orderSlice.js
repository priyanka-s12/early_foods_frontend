import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrdersAsync = createAsyncThunk(
  'order/fetchOrdersAsync',
  async () => {
    const response = await axios.get(
      'https://early-foods-backend.vercel.app/api/orders'
    );
    console.log(response);
    return response.data;
  }
);

export const createOrderAsync = createAsyncThunk(
  'order/createOrderAsync',
  async (newOrder) => {
    const response = await axios.post(
      'https://early-foods-backend.vercel.app/api/orders',
      newOrder
    );
    console.log(response);
    return response.data;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: { orders: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrdersAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchOrdersAsync.fulfilled, (state, action) => {
      state.status = 'success';
      state.orders = action.payload.allOrders;
    });
    builder.addCase(fetchOrdersAsync.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });

    builder.addCase(createOrderAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createOrderAsync.fulfilled, (state, action) => {
      state.status = 'success';
      console.log('payload for order: ', action.payload);
      state.orders.push({ ...action.payload.order });
    });
    builder.addCase(createOrderAsync.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });
  },
});

export default orderSlice.reducer;

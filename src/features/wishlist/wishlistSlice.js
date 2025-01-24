import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWishlistAsync = createAsyncThunk(
  'wishlist/fetchWishlistAsync',
  async () => {
    const response = await axios.get(
      'https://early-foods-backend.vercel.app/api/wishlists'
    );
    console.log(response);
    return response.data;
  }
);
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlistItems: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWishlistAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchWishlistAsync.fulfilled, (state, action) => {
      state.status = 'success';
      state.wishlistItems = action.payload;
    });
    builder.addCase(fetchWishlistAsync.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });
  },
});

export default wishlistSlice.reducer;

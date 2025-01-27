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

export const addToWishlistAsync = createAsyncThunk(
  'wishlist/addToWishlistAsync',
  async (newItem) => {
    const response = await axios.post(
      'https://early-foods-backend.vercel.app/api/wishlists',
      newItem
    );
    // console.log(response.data.message);
    alert(response.data.message);
    return response.data;
  }
);

export const removeFromWishlistAsync = createAsyncThunk(
  'wishlist/removeFromWishlistAsync',
  async (id) => {
    const response = await axios.delete(
      `https://early-foods-backend.vercel.app/api/wishlists/${id}`
    );
    const data = response.data;
    window.location.reload();
    return data;
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlistItems: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearAll: (state, action) => {
      console.log(action.payload);
      state.wishlistItems = [];
    },
  },
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

    builder.addCase(addToWishlistAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(addToWishlistAsync.fulfilled, (state, action) => {
      state.status = 'success';
      console.log('wishlist: ', action.payload);
      // console.log('wishlist data: ', action.payload.wishlist.product);

      // const existingItem = state.wishlistItems.find(
      //   (wish) => wish.product?._id == action.payload.wishlist.product
      // );
      // console.log(existingItem);

      // if (existingItem) {
      //   alert('Item is already present in the wishlist');
      //   return;
      // } else {
      //   state.wishlistItems.push({ ...action.payload });
      // }
      // if (existingItem === -1) {
      //   state.wishlistItems.push(action.payload);
      //   alert('Item added to wishlist.');
      // } else {
      //   alert('Product is already present in the wishlist.');
      // }
    });
    builder.addCase(addToWishlistAsync.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });

    builder.addCase(removeFromWishlistAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(removeFromWishlistAsync.fulfilled, (state, action) => {
      state.status = 'success';
      console.log(action.payload);
      state.wishlistItems = state.wishlistItems.filter(
        (element) => element._id !== action.payload
      );
    });
    builder.addCase(removeFromWishlistAsync.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });
  },
});

export const { clearAll } = wishlistSlice.actions;
export default wishlistSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

export const fetchWishlistAsync = createAsyncThunk(
  'wishlist/fetchWishlistAsync',
  async () => {
    const response = await axios.get(
      'https://early-foods-backend.vercel.app/api/wishlists'
    );
    console.log('resp from get api: ', response.data);
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
    // console.log('response from post api', response.data);
    toast.success(response.data.message, { position: 'top-right' });
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

export const moveFromWishlistToCart = createAsyncThunk(
  'wishlist/moveFromWishlistToCart',
  async (item) => {
    const response = await axios.post(
      `https://early-foods-backend.vercel.app/api/wishlists/move`,
      item
    );
    console.log('resp from moving wishlist item to cart: ', response.data);
    toast.success(response.data.message, { position: 'top-right' });
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
  reducers: {
    // clearAll: (state, action) => {
    //   console.log(action.payload);
    //   state.wishlistItems = [];
    // },
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
      console.log('action payload for wishlist: ', action.payload);

      const data = [...state.wishlistItems, action.payload.wishlist];
      console.log(data);
      state.wishlistItems = data.filter((item) => item !== undefined);
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

    builder.addCase(moveFromWishlistToCart.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(moveFromWishlistToCart.fulfilled, (state, action) => {
      state.status = 'success';
      console.log(
        'action payload for moving wishlist to cart: ',
        action.payload
      );

      const data = [...state.wishlistItems, action.payload.wishlist];
      console.log(data);
      state.wishlistItems = data.filter(
        (item) =>
          item !== undefined && item._id !== action.payload.wishlist?._id
      );
    });
    builder.addCase(moveFromWishlistToCart.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });
  },
});

export const { clearAll, updateWishlistCount } = wishlistSlice.actions;
export default wishlistSlice.reducer;

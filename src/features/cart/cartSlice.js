import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

export const fetchCartAsync = createAsyncThunk(
  'wishlist/fetchCartAsync',
  async () => {
    const response = await axios.get(
      'https://early-foods-backend.vercel.app/api/carts'
    );
    console.log('resp from get api: ', response.data);
    return response.data;
  }
);

export const addToCartAsync = createAsyncThunk(
  'cart/addToCartAsync',
  async (newItem) => {
    const response = await axios.post(
      'https://early-foods-backend.vercel.app/api/carts',
      newItem
    );
    console.log('response from post api', response.data);
    toast.success(response.data.message, { position: 'top-right' });
    return response.data;
  }
);

export const removeFromCartAsync = createAsyncThunk(
  'cart/removeFromCartAsync',
  async (id) => {
    const response = await axios.delete(
      `https://early-foods-backend.vercel.app/api/carts/${id}`
    );
    const data = response.data;
    window.location.reload();
    return data;
  }
);

export const moveFromCartToWishlist = createAsyncThunk(
  'cart/moveFromCartToWishlist',
  async (item) => {
    const response = await axios.post(
      `https://early-foods-backend.vercel.app/api/carts/move`,
      item
    );
    console.log('resp from moving cart item to wishlist: ', response.data);
    toast.success(response.data.message, { position: 'top-right' });
    return response.data;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    totalPrice: 0,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCartAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchCartAsync.fulfilled, (state, action) => {
      state.status = 'success';
      state.cartItems = action.payload;
    });
    builder.addCase(fetchCartAsync.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });

    builder.addCase(addToCartAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(addToCartAsync.fulfilled, (state, action) => {
      state.status = 'success';
      console.log('action payload for cart: ', action.payload);

      const data = [...state.cartItems, action.payload.cart];
      state.cartItems = data.filter((item) => item !== undefined);
    });
    builder.addCase(addToCartAsync.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });

    builder.addCase(removeFromCartAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(removeFromCartAsync.fulfilled, (state, action) => {
      state.status = 'success';
      console.log(action.payload);
      state.cartItems = state.cartItems.filter(
        (element) => element._id !== action.payload
      );
    });
    builder.addCase(removeFromCartAsync.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });

    builder.addCase(moveFromCartToWishlist.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(moveFromCartToWishlist.fulfilled, (state, action) => {
      state.status = 'success';
      console.log(
        'action payload for moving cart to wishlist: ',
        action.payload
      );

      const data = [...state.cartItems, action.payload.cart];
      console.log(data);
      state.cartItems = data.filter(
        (item) => item !== undefined && item._id !== action.payload.cart?._id
      );
    });
    builder.addCase(moveFromCartToWishlist.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });
  },
});

export const {} = cartSlice.actions;
export default cartSlice.reducer;

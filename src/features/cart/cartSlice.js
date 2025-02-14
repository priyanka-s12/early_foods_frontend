import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

export const fetchCartAsync = createAsyncThunk(
  'cart/fetchCartAsync',
  async () => {
    const response = await axios.get(
      `https://early-foods-backend.vercel.app/api/carts`
    );
    // console.log('resp from get cart api: ', response.data);
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
    // console.log('response from post cart api', response.data);
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

export const increaseQuantityAsync = createAsyncThunk(
  'cart/increaseQuantityAsync',
  async (item) => {
    const response = await axios.put(
      'https://early-foods-backend.vercel.app/api/carts/increase',
      item
    );
    // console.log(response);
    toast.success(response.data.message, { position: 'top-right' });
    return response.data;
  }
);

export const decreaseQuantityAsync = createAsyncThunk(
  'cart/decreaseQuantityAsync',
  async (item) => {
    const response = await axios.put(
      'https://early-foods-backend.vercel.app/api/carts/decrease',
      item
    );
    // console.log(response);
    toast.success(response.data.message, { position: 'top-right' });
    return response.data;
  }
);

export const moveFromCartToWishlist = createAsyncThunk(
  'cart/moveFromCartToWishlist',
  async (newData) => {
    const response = await axios.put(
      `https://early-foods-backend.vercel.app/api/wishlists/move`,
      newData
    );
    console.log('resp from moving cart item to wishlist: ', response.data);
    toast.success('Item has been moved to wishlist', { position: 'top-right' });
    return response.data;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    wishlistItems: [],
    totalPrice: 0,
    totalCartItems: 0,
    status: 'idle',
    error: null,
  },
  reducers: {
    calculateTotal: (state) => {
      const total = state.cartItems.reduce((acc, curr) => {
        // console.log(curr.quantity, curr.product.sellingPrice);
        return acc + curr.product?.sellingPrice * curr.quantity;
      }, 0);
      // console.log(total);
      state.totalPrice = total;
    },
    calculateTotalCartItems: (state) => {
      const totalCart = state.cartItems.reduce((acc, curr) => {
        return acc + curr.quantity;
      }, 0);
      // console.log(totalCart);
      state.totalCartItems = totalCart;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchCartAsync.fulfilled, (state, action) => {
      state.status = 'success';
      state.cartItems = action.payload.cart;
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

      const index = state.cartItems.findIndex(
        (item) => item.product._id === action.payload.cart.product
      );
      // console.log('index: ', index);
      if (index === -1) {
        state.cartItems = [...state.cartItems, action.payload.cart];
      } else {
        state.cartItems[index].quantity = state.cartItems[index].quantity + 1;
      }
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
      // console.log(action.payload);
      state.cartItems = state.cartItems.filter(
        (element) => element._id !== action.payload
      );
    });
    builder.addCase(removeFromCartAsync.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });

    builder.addCase(increaseQuantityAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(increaseQuantityAsync.fulfilled, (state, action) => {
      state.status = 'success';
      // console.log('Payload: ', action.payload);

      const index = state.cartItems.findIndex((item) => {
        console.log(item.product._id, action.payload.product.product);
        return item.product._id === action.payload.product.product;
      });
      // console.log(index);
      state.cartItems[index].quantity = action.payload.product.quantity;
    });
    builder.addCase(increaseQuantityAsync.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });

    builder.addCase(decreaseQuantityAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(decreaseQuantityAsync.fulfilled, (state, action) => {
      state.status = 'success';
      // console.log('Payload: ', action.payload);

      const index = state.cartItems.findIndex((item) => {
        console.log(item.product._id, action.payload.product.product);
        return item.product._id === action.payload.product.product;
      });
      // console.log(index);

      state.cartItems[index].quantity = action.payload.product.quantity;
    });
    builder.addCase(decreaseQuantityAsync.rejected, (state, action) => {
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

      state.cartItems = state.cartItems.filter((item) => {
        return item.product._id !== action.payload.product.product;
      });

      state.wishlistItems = [...state.wishlistItems, action.payload.product];
    });
    builder.addCase(moveFromCartToWishlist.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });
  },
});

export const { calculateTotal, calculateTotalCartItems } = cartSlice.actions;
export default cartSlice.reducer;

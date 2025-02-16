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
    console.log(item);
    const response = await axios.put(
      'https://early-foods-backend.vercel.app/api/carts/decrease',
      item
    );
    // console.log(response);
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
    toast.success(response.data.message, { position: 'top-right' });
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
      // console.log('action payload for cart: ', action.payload);

      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload.cart._id
      );
      // console.log(existingItem);

      if (existingItem) {
        existingItem.quantity = existingItem.quantity + 1;
      } else {
        state.cartItems.push({ ...action.payload.cart });
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
        return item._id === action.payload.product._id;
      });

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
        return item._id === action.payload.product._id;
      });

      // console.log('Index: ', index, 'Qty: ', state.cartItems[index].quantity);

      if (state.cartItems[index].quantity === 1) {
        state.cartItems = state.cartItems.filter((element) => {
          // console.log(element._id, action.payload.product._id);
          return element._id !== action.payload.product._id;
        });
        toast.error('Item is removed from the cart', {
          position: 'top-right',
        });
      } else {
        state.cartItems[index].quantity = action.payload.product.quantity;
        toast.success('Decreased the quantity of item in the cart', {
          position: 'top-right',
        });
      }
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

      if (action.payload.product) {
        state.cartItems = state.cartItems.filter((item) => {
          console.log(item.product._id, action.payload.product.product);
          return item._id !== action.payload.product._id;
        });

        state.wishlistItems = [...state.wishlistItems, action.payload.product];
      }
    });
    builder.addCase(moveFromCartToWishlist.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });
  },
});

export const { calculateTotal, calculateTotalCartItems } = cartSlice.actions;
export default cartSlice.reducer;

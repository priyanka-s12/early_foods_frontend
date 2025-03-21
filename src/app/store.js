import { configureStore } from '@reduxjs/toolkit';
import categorySlice from '../features/category/categorySlice';
import productsSlice from '../features/products/productsSlice';
import userSlice from '../features/user/userSlice';
import addressSlice from '../features/address/addressSlice';
import wishlistSlice from '../features/wishlist/wishlistSlice';
import cartSlice from '../features/cart/cartSlice';
import orderSlice from '../features/order/orderSlice';

const store = configureStore({
  reducer: {
    products: productsSlice,
    categories: categorySlice,
    user: userSlice,
    address: addressSlice,
    wishlist: wishlistSlice,
    cart: cartSlice,
    order: orderSlice,
  },
});

export default store;

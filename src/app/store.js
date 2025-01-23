import { configureStore } from '@reduxjs/toolkit';
import categorySlice from '../features/category/categorySlice';
import productsSlice from '../features/products/productsSlice';
import userSlice from '../features/user/userSlice';
import addressSlice from '../features/address/addressSlice';
const store = configureStore({
  reducer: {
    products: productsSlice,
    categories: categorySlice,
    user: userSlice,
    address: addressSlice,
  },
});

export default store;

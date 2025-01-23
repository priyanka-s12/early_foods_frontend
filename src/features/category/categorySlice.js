import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategoriesAsync = createAsyncThunk(
  'categories/fetchCategoriesAsync',
  async () => {
    const response = await axios.get(
      'https://early-foods-backend.vercel.app/api/categories'
    );
    // console.log(response);
    return response.data;
  }
);

export const fetchCategorybyIdAsync = createAsyncThunk(
  'categories/fetchCategorybyIdAsync',
  async (categoryId) => {
    const response = await axios.get(
      `https://early-foods-backend.vercel.app/api/categories/${categoryId}`
    );
    // console.log(response);
    return response.data;
  }
);
const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    status: 'idle',
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchCategoriesAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
      state.status = 'success';
      state.categories = action.payload;
    });
    builder.addCase(fetchCategoriesAsync.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });

    builder.addCase(fetchCategorybyIdAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchCategorybyIdAsync.fulfilled, (state, action) => {
      state.status = 'success';
      state.categories = action.payload;
    });
    builder.addCase(fetchCategorybyIdAsync.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });
  },
});

export default categorySlice.reducer;

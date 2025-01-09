import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await axios.get(
      'https://early-foods-backend.vercel.app/api/categories'
    );
    // console.log(response);
    return response.data;
  }
);

export const fetchCategorybyId = createAsyncThunk(
  'categories/fetchCategorybyId',
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
    builder.addCase(fetchCategories.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.status = 'success';
      state.categories = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });

    builder.addCase(fetchCategorybyId.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchCategorybyId.fulfilled, (state, action) => {
      state.status = 'success';
      state.categories = action.payload;
    });
    builder.addCase(fetchCategorybyId.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });
  },
});

export default categorySlice.reducer;

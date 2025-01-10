import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get(
      'https://early-foods-backend.vercel.app/api/products'
    );
    return response.data;
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId) => {
    const response = await axios.get(
      `https://early-foods-backend.vercel.app/api/products/${productId}`
    );
    return response.data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
    priceRange: [50, 1000],
    categoryFilter: [],
    ratingFilter: 0,
    sortByPrice: '',
  },
  reducers: {
    setPriceRangeFilter: (state, action) => {
      state.priceRange = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
      // state.categoryFilter.push(action.payload);
    },
    setRatingFilter: (state, action) => {
      state.ratingFilter = action.payload;
    },
    setSortByPriceFilter: (state, action) => {
      state.sortByPrice = action.payload;
    },
    clearAllFilters: (state, action) => {
      state.categoryFilter = [];
      state.ratingFilter = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = 'success';
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });

    builder.addCase(fetchProductById.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.status = 'success';
      state.products = action.payload;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });
  },
});

export const {
  setPriceRangeFilter,
  setCategoryFilter,
  setRatingFilter,
  setSortByPriceFilter,
} = productsSlice.actions;
export default productsSlice.reducer;

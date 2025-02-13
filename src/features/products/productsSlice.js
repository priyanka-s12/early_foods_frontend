import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductsAsync = createAsyncThunk(
  'products/fetchProductsAsync',
  async () => {
    const response = await axios.get(
      'https://early-foods-backend.vercel.app/api/products'
    );
    // console.log(response);
    return response.data;
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId) => {
    const response = await axios.get(
      `https://early-foods-backend.vercel.app/api/products/${productId}`
    );
    console.log(response);
    return response.data;
  }
);

export const searchProductByTitleAsync = createAsyncThunk(
  'products/searchProductByTitleAsync',
  async (title) => {
    try {
      const response = await axios.get(
        `https://early-foods-backend.vercel.app/api/products/search/${title}`
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
    maxPrice: 0,
    minPrice: 0,
    priceRange: 0,
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
    },
    setRatingFilter: (state, action) => {
      state.ratingFilter = action.payload;
    },
    setSortByPriceFilter: (state, action) => {
      state.sortByPrice = action.payload;
    },
    clearAllFilters: (state) => {
      state.categoryFilter = [];
      state.ratingFilter = 0;
      state.sortByPrice = '';
      window.location.reload();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      state.status = 'success';
      const max = action.payload.reduce(
        (acc, curr) => (curr.sellingPrice > acc ? curr.sellingPrice : acc),
        action.payload[0].sellingPrice
      );

      const min = action.payload.reduce(
        (acc, curr) => (curr.sellingPrice < acc ? curr.sellingPrice : acc),
        action.payload[0].sellingPrice
      );

      state.maxPrice = max;
      state.minPrice = min;
      state.products = action.payload;
    });
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
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

    builder.addCase(searchProductByTitleAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(searchProductByTitleAsync.fulfilled, (state, action) => {
      state.status = 'success';
      console.log('Action payload for search: ', action.payload);
      state.products = action.payload;
    });
    builder.addCase(searchProductByTitleAsync.rejected, (state, action) => {
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
  clearAllFilters,
  setSearchTitle,
} = productsSlice.actions;

export default productsSlice.reducer;

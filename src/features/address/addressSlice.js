import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAddresses = createAsyncThunk(
  'address/fetchAddresses',
  async () => {
    const response = await axios.get(
      'https://early-foods-backend.vercel.app/api/addresses'
    );
    // console.log(response);
    return response.data;
  }
);

export const addAddressAsync = createAsyncThunk(
  'address/addAddressAsync',
  async (newAddress) => {
    const response = await axios.post(
      `https://early-foods-backend.vercel.app/api/addresses`,
      newAddress
    );
    // console.log(response);
    return response.data;
  }
);

export const updateAddressAsync = createAsyncThunk(
  'address/updateAddressAsync',
  async (addressToUpdate) => {
    const response = await axios.put(
      `https://early-foods-backend.vercel.app/api/addresses/${addressToUpdate._id}`,
      addressToUpdate
    );
    // console.log(response);
    return response.data;
  }
);

export const deleteAddressAsync = createAsyncThunk(
  'address/deleteAddressAsync',
  async (addressId) => {
    const response = await axios.delete(
      `https://early-foods-backend.vercel.app/api/addresses/${addressId}`
    );
    // console.log(response);
    const data = response.data;
    window.location.reload();
    return data;
  }
);
const addressSlice = createSlice({
  name: 'address',
  initialState: {
    addresses: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAddresses.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchAddresses.fulfilled, (state, action) => {
      state.status = 'success';
      state.addresses = action.payload;
    });
    builder.addCase(fetchAddresses.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });

    builder.addCase(addAddressAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(addAddressAsync.fulfilled, (state, action) => {
      state.status = 'success';
      state.addresses.push(action.payload);
    });
    builder.addCase(addAddressAsync.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });

    builder.addCase(updateAddressAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updateAddressAsync.fulfilled, (state, action) => {
      console.log(action.payload);
      // state.status = 'success';
      // state.addresses = state.addresses.map((element) =>
      //   element._id === action.payload._id ? action.payload : element
      // );
      const index = state.addresses.findIndex(
        (element) => element._id === action.payload._id
      );
      console.log(index);
      if (index !== -1) {
        state.status = 'success';
        state.addresses[index] = action.payload;
      }
    });
    builder.addCase(updateAddressAsync.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });

    builder.addCase(deleteAddressAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deleteAddressAsync.fulfilled, (state, action) => {
      state.status = 'success';
      console.log(action.payload);
      state.addresses = state.addresses.filter(
        (element) => element._id !== action.payload
      );
    });
    builder.addCase(deleteAddressAsync.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });
  },
});

export default addressSlice.reducer;

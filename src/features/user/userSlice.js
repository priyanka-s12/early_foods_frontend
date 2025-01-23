import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserByIdAsync = createAsyncThunk(
  'user/fetchUserByIdAsync',
  async (userId) => {
    const response = await axios.get(
      `https://early-foods-backend.vercel.app/api/users/${userId}`
    );
    console.log(response);
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserByIdAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchUserByIdAsync.fulfilled, (state, action) => {
      state.status = 'success';
      state.user = action.payload;
    });
    builder.addCase(fetchUserByIdAsync.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });
  },
});

export default userSlice.reducer;

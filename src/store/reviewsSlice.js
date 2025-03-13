import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  }
);

export const addReview = createAsyncThunk(
  'reviews/addReview',
  async (reviewData) => {
    const response = await axios.post(BASE_URL, reviewData);
    return response.data;
  }
);

export const updateReview = createAsyncThunk(
  'reviews/updateReview',
  async ({ id, updatedReview }) => {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedReview);
    return response.data;
  }
);

export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
  }
);

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    searchQuery: '',
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch reviews
      .addCase(fetchReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add review
      .addCase(addReview.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      // Update review
      .addCase(updateReview.fulfilled, (state, action) => {
        const index = state.items.findIndex(review => review.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Delete review
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.items = state.items.filter(review => review.id !== action.payload);
      });
  },
});

export const { setSearchQuery } = reviewsSlice.actions;
export default reviewsSlice.reducer; 
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}api/books`;

// Helper function to get the auth header
const authHeader = () => {
  const token = localStorage.getItem('userToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Thunk to fetch all books
export const fetchBooks = createAsyncThunk('books/fetchBooks', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data.message : error.message);
  }
});

// Thunk to fetch a single book by ID
export const fetchBookById = createAsyncThunk('books/fetchBookById', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data.message : error.message);
  }
});

// Thunk to create a new book
export const createBook = createAsyncThunk('books/createBook', async (bookData, { rejectWithValue }) => {
  try {
    const response = await axios.post(API_URL, bookData, { headers: authHeader() });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data.message : error.message);
  }
});

// Thunk to update a book
export const updateBook = createAsyncThunk('books/updateBook', async ({ id, bookData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, bookData, { headers: authHeader() });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data.message : error.message);
  }
});

// Thunk to delete a book
export const deleteBook = createAsyncThunk('books/deleteBook', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data.message : error.message);
  }
});

// Slice to manage books state
const bookSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    selectedBook: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all books
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch a single book by ID
      .addCase(fetchBookById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBook = action.payload;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create a new book
      .addCase(createBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books.push(action.payload); // Add the new book to the list
      })
      .addCase(createBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update a book
      .addCase(updateBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.books.findIndex((book) => book._id === action.payload._id);
        if (index !== -1) {
          state.books[index] = action.payload; // Update the existing book
        }
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete a book
      .addCase(deleteBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books = state.books.filter((book) => book._id !== action.payload._id);
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookSlice.reducer;

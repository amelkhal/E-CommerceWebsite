// src/redux/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import bookReducer from './slices/bookSlice';
import orderReducer from './slices/orderSlice';
import userSlice from './slices/userSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  books: bookReducer,
  orders: orderReducer,
  users: userSlice,
});

export default rootReducer;
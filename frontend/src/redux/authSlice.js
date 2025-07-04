// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to load user on app start (auto-login)
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      // Try to get user from localStorage first
      const localUser = localStorage.getItem("user");
      if (localUser) {
        return JSON.parse(localUser);
      }

      // If no local user, fetch from backend
      const response = await axios.get("/api/v1/user/me", {
        withCredentials: true,
      });

      // Save to localStorage for next time
      localStorage.setItem("user", JSON.stringify(response.data.data));
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load user"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const { setLoading, setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;

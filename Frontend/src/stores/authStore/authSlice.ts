import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, register, AuthError } from "./authThunk";

interface AuthState {
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(
        login.rejected,
        (state, action: PayloadAction<AuthError | undefined>) => {
          state.error = action.payload
            ? action.payload.message
            : "Login failed due to an unknown error";
        }
      )
      .addCase(register.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(
        register.rejected,
        (state, action: PayloadAction<AuthError | undefined>) => {
          state.error = action.payload
            ? action.payload.message
            : "Registration failed due to an unknown error";
        }
      );
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

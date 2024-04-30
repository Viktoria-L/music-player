import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../configureStore";

interface AuthState {
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  error: null,
};

interface LoginPayload {
  user: string;
  pass: string;
}

interface RegisterPayload {
  firstname: string;
  lastname: string;
  user: string;
  pass: string;
}

interface AuthResponse {
  message?: string;
}

interface AuthError {
  message: string;
}

export const login = createAsyncThunk<
  AuthResponse,
  LoginPayload,
  { rejectValue: AuthError }
>("auth/login", async ({ user, pass }, { rejectWithValue }) => {
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ user, pass }),
    });
    const data: AuthResponse = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Unable to login");
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue({ message: error.message });
    }
    return rejectWithValue({ message: "An unexpected error occurred" });
  }
});

export const register = createAsyncThunk<
  AuthResponse,
  RegisterPayload,
  { rejectValue: AuthError }
>(
  "auth/register",
  async (
    { firstname, lastname, user, pass },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname, lastname, user, pass }),
      });
      const data: AuthResponse = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Unable to register");
      }
      // Optionally login after registering
      await dispatch(login({ user, pass }));
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue({ message: error.message });
      }
      return rejectWithValue({ message: "An unexpected error occurred" });
    }
  }
);

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

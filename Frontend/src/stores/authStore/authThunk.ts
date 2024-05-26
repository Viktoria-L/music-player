import { createAsyncThunk } from "@reduxjs/toolkit";

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

export interface AuthError {
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
      throw new Error(
        data.message || "An unexpected error occurred, please try again"
      );
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

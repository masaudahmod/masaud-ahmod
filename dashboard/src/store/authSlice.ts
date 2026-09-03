import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiRequestError, authApi, type User } from "../services/authApi";

type AuthState = {
  user: User | null;
  initialized: boolean;
  loading: boolean;
  error: string | null;
  pendingVerificationEmail: string | null;
};
const initialState: AuthState = {
  user: null,
  initialized: false,
  loading: false,
  error: null,
  pendingVerificationEmail: null,
};
const message = (error: unknown) =>
  error instanceof Error ? error.message : "Something went wrong.";

export const loadSession = createAsyncThunk(
  "auth/loadSession",
  async (_, { rejectWithValue }) => {
    try {
      return await authApi.me();
    } catch (error) {
      return rejectWithValue(
        error instanceof ApiRequestError && error.status === 401
          ? null
          : message(error),
      );
    }
  },
);
export const login = createAsyncThunk(
  "auth/login",
  async (input: { login: string; password: string }, { rejectWithValue }) => {
    try {
      return await authApi.login(input.login, input.password);
    } catch (error) {
      return rejectWithValue(message(error));
    }
  },
);
export const verifyLogin = createAsyncThunk(
  "auth/verifyLogin",
  async (
    input: { email: string; otp: string; trustDevice: boolean },
    { rejectWithValue },
  ) => {
    try {
      return (
        await authApi.verifyLogin(input.email, input.otp, input.trustDevice)
      ).user;
    } catch (error) {
      return rejectWithValue(message(error));
    }
  },
);
export const register = createAsyncThunk(
  "auth/register",
  async (
    input: { username: string; email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      await authApi.register(input.username, input.email, input.password);
      return input.email;
    } catch (error) {
      return rejectWithValue(message(error));
    }
  },
);
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (input: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      await authApi.verifyEmail(input.email, input.otp);
      return true;
    } catch (error) {
      return rejectWithValue(message(error));
    }
  },
);
export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (email: string, { rejectWithValue }) => {
    try {
      await authApi.resendOtp(email);
      return email;
    } catch (error) {
      return rejectWithValue(message(error));
    }
  },
);
export const logout = createAsyncThunk("auth/logout", async () => {
  await authApi.logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearPendingVerification: (state) => {
      state.pendingVerificationEmail = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(loadSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadSession.fulfilled, (state, action) => {
        state.user = action.payload;
        state.initialized = true;
        state.loading = false;
      })
      .addCase(loadSession.rejected, (state, action) => {
        state.user = null;
        state.initialized = true;
        state.loading = false;
        state.error =
          typeof action.payload === "string" ? action.payload : null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = "user" in action.payload ? action.payload.user : null;
        state.pendingVerificationEmail =
          "verificationRequired" in action.payload
            ? action.payload.email
            : null;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(verifyLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.pendingVerificationEmail = null;
        state.loading = false;
      })
      .addCase(verifyLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingVerificationEmail = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(resendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        Object.assign(state, initialState);
        state.initialized = true;
      }),
});

export const { clearError, clearPendingVerification } = authSlice.actions;
export default authSlice.reducer;

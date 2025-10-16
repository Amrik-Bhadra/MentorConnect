import { User } from "@/types/auth";
import { LoginPayloadType } from "@/types/payload";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


interface AuthState {
    user: User | null;
    token: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    status: 'idle',
    error: null,
}

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (loginData: { email: string, password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/auth/login', loginData);
            const { data } = response.data;
            localStorage.setItem('authToken', data.accessToken);

            return data;
        } catch (error: unknown) {
            let errorMessage = 'An unexpected error occurred';

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || 'An API error occured';
            } else if (error instanceof Error) {
                errorMessage = error.message;
            } else if (typeof error === 'string') {
                errorMessage = error;
            }

            return rejectWithValue(errorMessage);
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (registerData: { name: string, email: string, password: string, role: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/auth/register', registerData);
            const user = response.data;
            return user;
        } catch (error: unknown) {
            let errorMessage = 'An unexpected error occurred';

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || 'An API error occured';
            } else if (error instanceof Error) {
                errorMessage = error.message;
            } else if (typeof error === 'string') {
                errorMessage = error;
            }

            return rejectWithValue(errorMessage);
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            state.status = 'idle';
            localStorage.removeItem('authToken')
        },
        resetAuthState: (state) => {
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginPayloadType>) => {
                state.status = 'succeeded';
                state.token = action.payload.accessToken;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<>)=>{
            })

    }
})

export const { logout, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
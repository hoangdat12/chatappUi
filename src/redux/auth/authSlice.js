import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: user ? user : null,
    isLoading: false,
    isError: false,
    message: ''
}

// Register
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    }
    catch(error) {
        const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Active Account
export const activeAccount = createAsyncThunk('auth/activeAccount', async (data, thunkAPI) => {
    try {
        return await authService.activeAccount(data)
    } catch (error) {
        const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Login
export const login = createAsyncThunk('auth/login', async(data, thunkAPI) => {
    try {
        return await authService.login(data)
    } catch (error) {
        const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Logout
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})

// Refresh Token
export const updateTokens = createAsyncThunk('auth/updateTokens', async () => {
    return await authService.updateTokens()
})

// Reset Password 
export const updatePassword = createAsyncThunk('auth/updatePassword', async (data, thunkAPI) => {
    try {
        return await authService.updatePassword(data)
    } catch (error) {
        const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isLoading = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        // register
        builder.addCase(register.pending, (state) => {
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state) => {
            state.isLoading = false
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

        // Login
        .addCase(login.pending, (state) => {
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isAuthenticated = true
            state.access = action.payload.refresh
            state.refresh = action.payload.refresh
        })
        .addCase(login.rejected, (state, action) => {
            localStorage.removeItem('authToken')
            localStorage.removeItem('refreshToken')
            state.access = null
            state.refresh = null
            state.isLoading = false
            state.isError = true
            state.isAuthenticated = false
            state.message = action.payload.message
        })

        // Refresh
        .addCase(updateTokens.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateTokens.fulfilled, (state, action) => {
            state.isLoading = false
            state.isAuthenticated = true
            state.access = action.payload.access
            localStorage.setItem('authToken', action.payload.access)
        })
        .addCase(updateTokens.rejected, (state, action) => {
            localStorage.removeItem('authToken')
            localStorage.removeItem('refreshToken')
            state.access = null
            state.refresh = null
            state.isLoading = false
            state.isError = true
            state.isAuthenticated = false
            state.message = action.payload
            state.user = null
        })

        // Reset Password
        .addCase(updatePassword.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updatePassword.fulfilled, (state) => {
            state.isLoading = false
        })
        .addCase(updatePassword.rejected, (state, action) => {
            state.isError = true
            state.message = action.payload.message
        })
    },
})

export const {reset} = authSlice.actions
export default authSlice.reducer


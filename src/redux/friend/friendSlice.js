import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import friendService from './friendService'

const initialState = {
    friends: [],
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getFriends = createAsyncThunk('friend/getFriends', async (id, thunkAPI) => {
    try {
        return await friendService.getFriends(id)
    } catch (error) {
        const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getFriend = createAsyncThunk('friend/getFriend', async (id, thunkAPI) => {
    try {
        return await friendService.getFriend(id)
    } catch (error) {
        const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const friendSlice = createSlice({
    name: 'friend',
    initialState,
    reducers: {

    },
    extraReducers:(builder) => {
        builder.addCase(getFriends.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getFriends.fulfilled, (state, action) => {
            state.friends = action.payload
            state.isSuccess = true
            state.isLoading = false
        })
        .addCase(getFriends.rejected, (state, action) => {
            state.isSuccess = false
            state.isLoading = false
            state.message = action.payload
        })
    }
})

export default friendSlice.reducer
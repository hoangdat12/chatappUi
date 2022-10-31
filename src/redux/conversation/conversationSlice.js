import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import conversationService from "./conversationService";

export const getConversations = createAsyncThunk('conversation/getConversations', async (id, thunkAPI) => {
    try {
        return await conversationService.getConversations(id)
    } catch (error) {
        const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const initialState = {
    conversations: [],
    isSuccess: false,
    isLoading: false,
    message: ''
}

const conversationSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getConversations.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getConversations.fulfilled, (state, action) => {
            state.conversations = action.payload
            state.isSuccess = true
            state.isLoading = false
        })
        .addCase(getConversations.rejected, (state, action) => {
            state.isSuccess = false
            state.isLoading = false
            state.message = action.payload
        })
    }
})

export default conversationSlice.reducer

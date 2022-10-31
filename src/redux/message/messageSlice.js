import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import messageService from "./messageService";

export const getMessages = createAsyncThunk('message/getMessages', async (id, thunkAPI) => {
    try {
        return await messageService.getMessages(id)
    } catch (error) {
        const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const createMessage = createAsyncThunk('message/createMessage', async (data, thunkAPI) => {
    try {
        return await messageService.createMessage(data)
    } catch (error) {
        const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteMessage = createAsyncThunk('message/deleteMessage', async (id, thunkAPI) => {
    try {
        return await messageService.deleteMessage(id)
    } catch (error) {
        const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const initialState = {
    messages: [],
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        messageCreate: (state, action) => {
            state.messages = [...state.messages, action.payload]
        },
        messageDelete: (state, action) => {
            state.messages = state.messages.filter(message => (message.id !== action.payload))
        }
    },
    extraReducers:(builder) => {
        builder.addCase(getMessages.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getMessages.fulfilled, (state, action) => {
            state.messages = action.payload.data
            state.isSuccess = true
            state.isLoading = false
        })
        .addCase(getMessages.rejected, (state, action) => {
            state.isSuccess = false
            state.isLoading = false
            state.message = action.payload.message
        })
    }
})

export const {messageCreate, messageDelete} = messageSlice.actions

export default messageSlice.reducer
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import profileService from "./profileService"

export const getMyProfile = createAsyncThunk('profile/getMyProfile', async (id, thunkAPI) => {
    try {
        return await profileService.getMyProfile(id)
    } catch (error) {
        const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const initialState = {
    data: [],
    isSuccess: false,
    message: '',
    loading: false
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getMyProfile.pending, (state) => {
            state.loading = true
        })
        .addCase(getMyProfile.fulfilled, (state) => {
            state.isSuccess = true
            state.loading = false
        })
        .addCase(getMyProfile.rejected, (state, action) => {
            state.isSuccess = false
            state.loading = false
            state.message = action.payload.message
        })
    }
})

export default profileSlice.reducer
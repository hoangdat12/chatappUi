import { createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import postService from "./postService"

export const getPost = createAsyncThunk('post/getPost', async (id, thunkAPI) => {
    try {
        return await postService.getPost(id)
    } catch (error) {
        const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const createPost = createAsyncThunk('post/createPost', async (data, thunkAPI) => {
    try {
        return await postService.createPost(data)
    } catch (error) {
        const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const updatePost = createAsyncThunk('post/updatePost', async (data, thunkAPI) => {
    try {
        return await postService.updatePost(data)
    } catch (error) {
        const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deletePost = createAsyncThunk('post/deletePost', async (id, thunkAPI) => {
    try {
        return await postService.deletePost(id)
    } catch (error) {
        const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const initialState = {
    postData : [],
    isSuccess: false,
    message: '',
    loading: false
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        postCreate: (state, action) => {
            state.postData = [action.payload, ...state.postData]
        },
        postDelete: (state, action) => {
            state.postData = state.postData.filter( (post) => post.id !== action.payload)
        },
        // postUpdate: (state, action) => {
        //     state.postData = state.postData.map(post => {
        //         if (post.id === action.payload.id) {
        //             post = action.payload
        //         }
        //     })
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(getPost.pending, (state) => {
            state.loading = true
        })
        .addCase(getPost.fulfilled, (state, action) => {
            state.isSuccess = true
            state.postData = action.payload
            state.loading = false
        })
        .addCase(getPost.rejected, (state, action) => {
            state.isSuccess = false
            state.loading = false
            state.message = action.payload
        })
    }
})

export const {postCreate, postDelete, postUpdate} = postSlice.actions

export default postSlice.reducer
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/authSlice";
import profileReducer from './profile/profileSlice'
import postReducer from './post/postSlice'
import friendReducer from "./friend/friendSlice"
import conversationReducer from './conversation/conversationSlice'
import messageReducer from './message/messageSlice'

export default configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        post: postReducer,
        friend: friendReducer,
        conversation: conversationReducer,
        message: messageReducer,
    }
})
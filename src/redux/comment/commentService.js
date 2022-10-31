import axios from "axios";
import { URL } from "../../utils/api";

const getComment = async (postId) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const res = await axios.get(`${URL}api/comment/post/${postId}`, config)
    return res.data
}

const createComment = async (data) => {
    const congifg = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const res = await axios.post(`${URL}api/comment/${data.user}`, data, congifg)

    return res.data
}

const commentService = {
    getComment,
    createComment
}

export default commentService
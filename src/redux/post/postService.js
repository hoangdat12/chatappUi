import axios from "axios";
import { URL } from "../../utils/api";

const getPost = async (id) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const res = await axios.get(`${URL}api/post/all/${id}`, config)

    return res.data
}

const createPost = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const res = await axios.post(`${URL}api/post/${data.user}`, data, config)

    return res.data
}

const updatePost = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = {
        user: data.user,
        status: data.status,
        image: data.image
    }

    const res = await axios.put(`${URL}api/post/${data.id}`, body, config)

    return res.data
}


const deletePost = async (id) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const res = await axios.delete(`${URL}api/post/${id}`, config)

    return res.data
}

const postService = {
    getPost,
    createPost,
    deletePost,
    updatePost
}

export default postService
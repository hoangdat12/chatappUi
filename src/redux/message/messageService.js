import axios from "axios";
import { URL } from "../../utils/api";

const URL_API_GET_ALL_MESSAGES = 'api/message/all/'
const URL_API_CREATE_MESSAGE = 'api/message/'
const URL_API_DELETE_MESSAGE = 'api/message/'

// Get All Message in Conversation
const getMessages = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = {
        conversation: data.conversation
    }

    const res = await axios.post(`${URL}${URL_API_GET_ALL_MESSAGES}${data.id}`, body, config)

    return res.data
}

// Create New Message in Conversation
const createMessage = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const res = await axios.post(`${URL}${URL_API_CREATE_MESSAGE}${data.user}`, data, config)

    return res.data
}

// Delete Message in Conversation
const deleteMessage = async (id) => {
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    const res = await axios.delete(`${URL}${URL_API_DELETE_MESSAGE}${id}`, config)

    return res.data
}

const messageService = {
    getMessages,
    createMessage,
    deleteMessage
}

export default messageService
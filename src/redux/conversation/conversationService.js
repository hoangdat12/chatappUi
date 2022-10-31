import axios from "axios";
import { URL } from "../../utils/api";

const URL_API_GET_CONVERSATIONS = 'api/conversation/user/'

const getConversations = async (id) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const res = await axios.get(`${URL}${URL_API_GET_CONVERSATIONS}${id}`, config)

    return res.data
}

const conversationService = {
    getConversations,
}

export default conversationService
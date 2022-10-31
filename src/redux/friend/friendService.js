import axios from "axios";
import { URL } from "../../utils/api";

const URL_API_GETFRIENDS = 'api/friend/all/'
const URL_API_GETFRIEND = 'api/friend/'
const URL_API_CHECK_FRIEND = 'api/friend/is_friend/'

const getFriends = async (id) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const res = await axios.get(`${URL}${URL_API_GETFRIENDS}${id}`, config)

    return res.data
}

const getFriend = async (id) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const res = await axios.get(`${URL}${URL_API_GETFRIEND}${id}`, config)

    return res.data
}

const checkIsFriend = async (dataId) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = {
        profile_id: dataId.profile_id
    }

    const res = await axios.post(`${URL}${URL_API_CHECK_FRIEND}${dataId.id}`,body , config)

    return res.data
}

const friendService = {
    getFriends,
    getFriend,
    checkIsFriend
}

export default friendService
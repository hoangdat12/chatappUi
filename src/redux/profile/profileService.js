import axios from 'axios'
import { URL } from '../../utils/api'


const getMyProfile = async (id) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const res = await axios.get(`${URL}api/profile/${id}`, config)

    console.log('redux profile myProfile', res.data)
    if (res.status === 200) {
        console.log('redux profile myProfile', res.data)
        localStorage.setItem('profile', JSON.stringify(res.data))
    }

    return res.data
}

const getProfile = async (id) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const res = await axios.get(`${URL}api/profile/get/${id}`, config)

    console.log(res.data)

    return res.data
}

const profileService = {
    getMyProfile,
    getProfile
}

export default profileService
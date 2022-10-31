import axios from 'axios'
import {URL} from '../../utils/api'

const API_URL_REGISTER = 'auth/users/'
const API_URL_ACTIVATE = 'auth/users/activation/'
const API_URL_LOGIN =  'auth/jwt/create/'
const API_URL_GET_INFOR_USER = 'auth/users/me/'
const API_URL_REFRESH = 'auth/jwt/refresh/'
const API_URL_RESET_PASSWORD = 'auth/users/set_password/'

// Register User
const register = async (userData) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const res = await axios.post(`${URL}${API_URL_REGISTER}`, userData, config)

    if (res.status === 201) {
        localStorage.setItem('user', JSON.stringify(res.data))
    }

    return res.data
}

// Active Account
const activeAccount = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const res = await axios.post(`${URL}${API_URL_ACTIVATE}`, data, config)

    return res.data
}

// Get Information User
const getInforUser = async (token) => {
    const config = {
        headers: {
            'Authorization': `JWT ${token}`
        }
    }

    const res = await axios.get(`${URL}${API_URL_GET_INFOR_USER}`, config)

    if (res.status === 200) {
        localStorage.setItem('user', JSON.stringify(res.data))
        getProfile(res.data.id)
    }
}

const getProfile = async (id) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const res = await axios.get(`${URL}api/profile/${id}`, config)

    if (res.status === 200) {
        localStorage.setItem('profile', JSON.stringify(res.data))
    }

    return res.data
}

// Login User
const login = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const res = await axios.post(`${URL}${API_URL_LOGIN}`, data, config)

    if (res.status === 200) {
        localStorage.setItem('authToken', JSON.stringify(res.data.access))
        localStorage.setItem('refreshToken', JSON.stringify(res.data.refresh))

        getInforUser(res.data.access)
    }

    return res.data
}

// Logout User
const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    localStorage.removeItem('profile')
    window.location.reload()
}

// Update Token
const updateTokens = async () => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({
        refresh: JSON.parse(localStorage.getItem('refreshToken'))
    });

    const res = await axios.post(`${URL}${API_URL_REFRESH}`, body, config )
    if (res.status === 200) {
        localStorage.setItem('authToken', JSON.stringify(res.data.access))
    }
    else {
        logout()
    }

    return res.data
}

// Reset Password
const updatePassword = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${JSON.parse(localStorage.getItem('authToken'))}`
        }
    }

    const res = await axios.post(`${URL}${API_URL_RESET_PASSWORD}`, data, config)
    console.log(res.data)
    return res.data
}

const authService = {
    register,
    activeAccount,
    login,
    logout,
    updateTokens,
    updatePassword,
}

export default authService
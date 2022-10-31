import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { activeAccount } from '../../redux/auth/authSlice'

const ActiveAccount = () => {
    const {uid, token} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleActiveAccount = () => {
        dispatch(activeAccount({
            uid: uid,
            token: token,
        }))
        navigate('/page/login')
    }

    return (
        <div>
            <button onClick={handleActiveAccount}>Active Account</button>
        </div>
    )
}

export default ActiveAccount
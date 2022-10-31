import React from 'react'
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux'

const PrivateRoute = () => {
    const {user} = useSelector((state) => state.auth)

    return (
        user ? <Outlet /> : <Navigate to='/page/login' replace={true} />
    )
}

export default PrivateRoute
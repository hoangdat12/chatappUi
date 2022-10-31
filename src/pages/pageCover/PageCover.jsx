import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import shareVideo from '../../assets/share.mp4'
import { ButtonPage } from '../../components/button/Button'

import './pageCover.scss'

const PageCover = () => {
    const {user} = useSelector((state) => state.auth)

    return (
        user ? <Navigate to='/home' replace={true} /> :
        <div className='cover flex justify-start h-screen text-white'>
            <div className='relative w-full h-full'>
                <video 
                    src={shareVideo}
                    type='video/mp4'
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className='w-full h-full object-cover'
                />
                <div className='absolute top-0 left-0 w-full flex-col h-full flex items-center justify-center bg-blackOverlay'>
                    <div className='absolute logo__img'>
                        <img src="https://mona.media/template/images/icon-about.png" alt="" />
                    </div>
                    <h2 className='title'>WELCOME TO SOCIAL</h2>
                    <div className='text mt-2'>
                        <p>10 Million+ people have joined our network</p>
                        <p>We invite you to join the tribe</p>
                    </div>
                    <div className='mt-4'>
                        <ButtonPage className='signup_btn' path={'/page/signup'} name={'Signup'} />
                        <ButtonPage className='login_btn' path={'/page/login'} name={'Login'} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageCover
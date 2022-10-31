import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'

import {HiOutlineArrowRight} from 'react-icons/hi'
import {FcGoogle} from 'react-icons/fc'
import {FaFacebook} from 'react-icons/fa'

// import { InputValidated } from '../../components/input/Input'
import { register, reset, login } from '../../redux/auth/authSlice'

import {InputLabel1} from '../../components/input/Input'
import Spinner from '../../layouts/spinner/Spinner'

import './login.scss'

const Login = () => {
    const {log} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, message} = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (user) {
            navigate('/page/login')
        }

        dispatch(reset())

    }, [user, isError, message, navigate, dispatch])

    const [formData, setFormData] = useState({
        email : '',
        username: '',
        password: '',
        re_password: '',
        firstName: '',
        lastName: '',
    })

    const {email, username, password, re_password, firstName, lastName} = formData

    const onChangeValue = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const handleSubmit = () => {
        if (log === 'login') {
            const data = {
                username: username,
                password: password
            }
            dispatch(login(data))
            navigate('/home')
        }
        if (log === 'signup') {
            dispatch(register(formData))
        }
    }

    useEffect(() => {
        const enterEnvent = (event) => {
            if (event.keyCode === 13 && username !== '') {
                handleSubmit()
            }
        }
        document.addEventListener('keydown', enterEnvent)
        return () => {
            document.removeEventListener('keydown', enterEnvent)
        }
    })

    if (isLoading) {
        return (
            <Spinner />
        )
    }

    return (
        user ? <Navigate to='/home' replace={true}/> :
        <div className="login">
            <div className='content grid grid-cols-2 rounded-2xl bg-white'>
                <div className='col-span-1 w-full h-full image rounded-2xl text-white' style={{backgroundImage: `url('https://images.pexels.com/photos/3753025/pexels-photo-3753025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`}}>
                    <div className='content2 flex flex-col justify-start'>
                        <div className='logo flex flex-col px-4 py-2 text-xl font-semibold'>
                            <span className='text-center'>THEGOOD</span>
                            <span className='text-center'>NETWORK</span>
                        </div>
                        <div className='mt-4'>
                            <h3 className='text-lg font-medium mb-1'>We are</h3>
                            <h2 className='text-2xl font-semibold mb-1'>Invite only right now</h2>
                            <h4 className='text-sm'>10 Million+ people have joined our network</h4>
                            <h4 className='text-sm'>We invite you to join the tribe</h4>
                        </div>
                        <div className='mt-auto'>
                            <h3 className='text-lg font-medium mb-1'>Already have Account?</h3>
                            <Link to={`/page/${log === 'login' ? 'signup' : 'login'}`} className='text-xl font-bold hover:text-blue-500 duration-300'>{log === 'login' ? 'Sign up' : 'Login'}</Link>
                        </div>
                    </div>
                </div>
                <div className='col-span-1 form content'>
                    <h3 className='text-3xl font-semibold mb-8'>{log === 'login' ? 'Login' : 'Sign up'}</h3>
                    <form>
                        <InputLabel1
                            className={`${log === 'login' ? 'hidden' : ''}`}
                            label={'Email'} 
                            value={email} 
                            name={'email'}
                            onChange={onChangeValue} 
                            type={'email'} 
                        />
                        <InputLabel1
                            label={'Username'} 
                            value={username} 
                            name={'username'}
                            onChange={onChangeValue} 
                            type={'text'} 
                        />
                        <InputLabel1
                            label={'Password'} 
                            value={password} 
                            name={'password'}
                            onChange={onChangeValue} 
                            type={'password'} 
                        />
                        <InputLabel1
                            className={`${log === 'login' ? 'hidden' : ''}`}
                            label={'RePassword'} 
                            value={re_password} 
                            name={'re_password'}
                            onChange={onChangeValue} 
                            type={'password'} 
                        />
                        
                        <div className='flex justify-between gap-4'>
                            <InputLabel1
                                className={`${log === 'login' ? 'hidden' : ''} w-1/2`}
                                label={'First Name'} 
                                value={firstName} 
                                name={'firstName'}
                                onChange={onChangeValue} 
                                type={'text'} 
                            />
                            
                            <InputLabel1
                                className={`${log === 'login' ? 'hidden' : ''} w-1/2`}
                                label={'Last Name'} 
                                value={lastName} 
                                name={'lastName'}
                                onChange={onChangeValue} 
                                type={'text'} 
                            />
                        </div>
                        
                    </form>
                    <button 
                        onClick={handleSubmit}
                        className='flex items-center justify-center mt-4 text-white font-medium text-lg bg-gradient-to-r from-cyan-500 to-blue-500 w-full px-4 py-2 rounded-xl'
                    >
                        <span className='mr-2'>{log === 'login' ? 'Login' : 'Sign up'}</span>
                        <span><HiOutlineArrowRight /></span>
                    </button>
                    <div className={`${log === 'login' ? '' : 'hidden'} line`}></div>
                    <div className={`${log === 'login' ? '' : 'hidden'} flex items-center justify-center cursor-pointer border-2 border-slate-300 mt-4 px-4 py-2 rounded-xl`}>
                        <i className='text-xl mr-2 '><FcGoogle /></i>
                        <span className='text-base font-medium'>Continue with Google</span>
                    </div>
                    <div className={`${log === 'login' ? '' : 'hidden'} flex items-center justify-center cursor-pointer border-2 border-slate-300 mt-4 px-4 py-2 rounded-xl`}>
                        <i className='text-xl mr-2 text-blue-600'><FaFacebook /></i>
                        <span className='text-base font-medium'>Continue with Facebook</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
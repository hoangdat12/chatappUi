import React, { useState } from 'react'
import {Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import {AiOutlineSetting} from 'react-icons/ai'
import {IoKeyOutline, IoImageOutline, IoNotificationsOutline} from 'react-icons/io5'
import {SiFigshare} from 'react-icons/si'

import { updatePassword } from '../../redux/auth/authSlice'

import Navbar from '../../layouts/navbar/Navbar'
import {InputLabel} from '../../components/input/Input'
import Avatar from '../../components/avatar/Avatar'
import { ButtonPage } from '../../components/button/Button'

import './setting.scss'

const selector = [
    {
        name: 'Settings',
        script: 'Update people information quickly and conveniently',
        icon: <AiOutlineSetting />,
        path: '/general'
    },
    {
        name: 'Security',
        script: 'Security methods. Account-specific security settings',
        icon: <IoKeyOutline />,
        path: '/security'
    },
    {
        name: 'Image',
        script: 'Manage your photos and posts on your profile',
        icon: <IoImageOutline />,
        path: '/general'
    },
    {
        name: 'Notification',
        script: 'Notifications you received recently on your profile',
        icon: <IoNotificationsOutline />,
        path: '/general'
    },
    {
        name: 'Intergration',
        script: 'Environment that connects people together',
        icon: <SiFigshare />,
        path: '/general'
    },
]

const Setting = () => {
    const {key} = useParams()
    const profile = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : null
    const active = selector.findIndex(e => e.path === `/${key}`)

    return (
        <>
        <Navbar className='close' />
        <div className='setting'>
            <div className="select border-r">
                <h2 className='flex items-center text-2xl font-semibold h-10 ml-3 font-poppins' style={{minHeight: '60px'}}>Settings</h2>
                <div>
                    {
                        selector.map((select, index) => (
                            <div key={index} className={`flex px-4 py-5 border-t b_color cursor-pointer ${index === 4 ? 'border-b' : ''} ${index === active ? 'active' : ''}`}>
                                <i className='text-2xl mr-4 flex items-start'>{select.icon}</i>
                                <Link to={`/setting${select.path}`}>
                                    <span className='text-xl font-medium'>{select.name}</span>
                                    <p className='text-sm font-thin mt-1'>{select.script}</p>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
            {
                key === 'general' ?  <SettingContent profile={profile} /> :  <ChangePassword />
            }
        </div>
        </>
    )
}

const SettingContent = (props) => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

    const [about, setAbout] = useState(props.profile.bio)
    const [firstName, setFirstName] = useState(props.profile.first_name)
    const [lastName, setLastName] = useState(props.profile.last_name)
    const [myCountry, setMyCountry] = useState(props.profile.country)
    const [email, setEmail] = useState(user.email)

    const handleUpdateProfile = async () => {
    //    const config = {
    //         headers: {
    //             'Content-type': 'application/json'
    //         }
    //    }

    //    const body = {
    //         ...profile,
    //         bio: about,
    //         first_name: firstName,
    //         last_name: lastName,
    //         country: myCountry
    //    }

    //    const res = await axios.get(`http://127.0.0.1:8000/profile/update/${profile.id}`, body, config)

    //    if (res.data === 200) {
    //         window.location.reload()
    //    }
    }

    return (
        <div className="setting__content">
            <div className="content">
                <h3 className='text-3xl font-bold mb-4'>Account</h3>
                <div className='flex gap-8'>
                    <InputLabel className='rounded-xl w-full' label={'First Name'} value={firstName} onChange={setFirstName} type={'text'}/>
                    <InputLabel className='rounded-xl w-full' label={'Last Name'} value={lastName} onChange={setLastName} type={'text'}/>
                </div>
                <div className='mb-4'>
                    <h4 className='text-lg font-medium'>Photo</h4>
                    <div className='flex items-center ml-2 mt-2'>
                        <Avatar className={'w-14 h-14'} image={props.profile.avatar}/>
                        <button className='px-2 py-2 mx-4 border border-slate-800 rounded-xl' style={{background: "#f8fafc"}}>Change</button>
                        <button>Remove</button>
                    </div>
                </div>
                <div className='mb-4'>
                    <h4 className='text-lg font-medium'>About</h4>
                    <textarea 
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        className='w-full rounded-xl outline-none px-4 py-2 h-22 shadow-sm'
                    />
                </div>
                <div>
                    <h3 className='text-xl font-medium'>Personal Information</h3>
                    <p className='text-sm font-normal mb-4'>This information will be displayed publicly so be careful what you share</p>
                    <div className='flex gap-4'>
                        <InputLabel className='rounded-xl w-full' label={'Email address'} value={email} onChange={setEmail} type={'text'}/>
                        <InputLabel className='rounded-xl w-full' label={'Phone Number'} value={''} type={'text'}/>
                    </div>
                    <div className='flex gap-4'>
                        <InputLabel className='rounded-xl w-full' label={'Country'} value={myCountry} onChange={setMyCountry} type={'text'}/>
                        <InputLabel className='rounded-xl w-full' label={'Language'} value={'Vietnamese'} type={'text'}/>
                    </div>
                    <div className='text-sm mb-6'>This account was created on January 5, 2017, 8:35:40 PM</div>
                    <div className='flex justify-end'>
                        <ButtonPage className='btn_save' path={'#'} name={'Save'} onClick={handleUpdateProfile} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const ChangePassword = () => {

    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        current_password: '',
        new_password: '',
        re_new_password: '',
    })

    const {current_password, new_password, re_new_password} = formData

    const handleOnChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const handleSubmit = (e) => {
        dispatch(updatePassword(formData))
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900 setting__content">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link to="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    Flowbite    
                </Link>
                <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                    <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Change Password
                    </h2>
                    <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input 
                                value={current_password}
                                onChange={(e) => handleOnChange(e)}
                                type="password" 
                                name="current_password" 
                                id="password" 
                                placeholder="••••••••" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                            <input 
                                value={new_password}
                                onChange={(e) => handleOnChange(e)}
                                type="password" 
                                name="new_password" 
                                id="new_password" 
                                placeholder="••••••••" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                            <input 
                                value={re_new_password}
                                onChange={(e) => handleOnChange(e)}
                                type="password" 
                                name="re_new_password" 
                                id="confirm-password" 
                                placeholder="••••••••" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="newsletter" aria-describedby="newsletter" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="newsletter" className="font-light text-gray-500 dark:text-gray-300">I accept the <Link to='#' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Terms and Conditions</Link></label>
                            </div>
                        </div>
                        <button 
                            onClick={(e) => handleSubmit(e)}
                            type='submit'
                            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                            Reset passwod
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Setting
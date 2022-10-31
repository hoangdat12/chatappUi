import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useLocation, Link} from 'react-router-dom'
import axios from 'axios'

import { logout } from '../../redux/auth/authSlice'
import { getPost } from '../../redux/post/postSlice'
import { getFriends } from '../../redux/friend/friendSlice'
import {getConversations} from '../../redux/conversation/conversationSlice'
import { updateTokens } from '../../redux/auth/authSlice'

import {GiEgyptianProfile} from 'react-icons/gi'
import {AiOutlineHome} from 'react-icons/ai'
import {FiSend, FiSettings} from 'react-icons/fi'
import {RiGitRepositoryPrivateLine, RiLogoutCircleRLine} from 'react-icons/ri'
import {MdOutlineDarkMode} from 'react-icons/md'
import {BsSun, BsPerson} from 'react-icons/bs'
import {FaXbox} from 'react-icons/fa'

import { useDarkMode } from '../../hooks/useDarkMode'
import {ButtonOutline} from '../../components/button/Button'
import Avatar from '../../components/avatar/Avatar'

import './navbar.scss'

const selectNav = [
    {
        display: 'NewsFeed',
        path: '/home',
        icons: <AiOutlineHome />,
    },
    {
        display: 'Messenges',
        path: '/messenges/3/5',
        icons: <FiSend />,
    },
    {
        display: 'Profile',
        path: '/profile',
        icons: <BsPerson />,
    },
    {
        display: 'Friends',
        path: '/friends',
        icons: <RiGitRepositoryPrivateLine />,
    },
    {
        display: 'Setting',
        path: '/setting/general',
        icons: <FiSettings />,
    },
    {
        display: 'Logout',
        path: '/page/login',
        icons: <RiLogoutCircleRLine />,
    },
]

const Navbar = (props) => {
    const dispatch = useDispatch()
    const {pathname} = useLocation()

    const [newMessage, setNewMessage] = useState(null)

    const {user} = useSelector((state) => state.auth)
    
    const {access} = useSelector((state) => state.auth)
    
    const profile = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : null

    const [isDarkMode, toggleDarkMode] = useDarkMode()

    const active = selectNav.findIndex(e => e.path === pathname)

    useEffect(() => {
        const getNewMessage = async () => {
            const config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            }

            const res = await axios.get(`http://127.0.0.1:8000/api/message/get/new/${user.id}`, config)
            if (res.status === 200) {
                setNewMessage(res.data)
            }
        }
        getNewMessage()
    }, [user.id])
    
    useEffect(() => {
        dispatch(getPost(user.id))
    }, [user.id, dispatch])

    useEffect(() => {
        dispatch(getFriends(user.id))
    }, [user.id, dispatch])

    useEffect(() => {
        dispatch(getConversations(user.id))
    }, [user.id, dispatch])
  
    useEffect(() => {
        let nineMinus = 100 * 600 * 9
        let interval = setInterval(() => {
            if(access) {
                dispatch(updateTokens())
                console.log('update Token')
            }
        }, nineMinus)
        return () => clearInterval(interval)
    }, [access, dispatch])

    const handleDarkMode = () => {
        toggleDarkMode(!isDarkMode)
    }

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <div className={`${props.className} navbar overflow-hidden fixed h-screen duration-300 text-black bg-mainLight dark:bg-mainDark dark:text-white`}>
            <div className='items-center justify-center bg-gray-300 duration-300 dark:bg-slate-800 show_up hidden' style={{minHeight: '60px'}}>
                <i><FaXbox /></i>
            </div>

            <div className="profile mb-10 mt-10 hidden_elemenet">
                <Avatar className={'profile__avatar overflow-hidden'} image={profile.avatar}/>
                <div className="profile__des mb-4 mt-4">
                    <h4 className='name text-lg font-bold'>{profile.nickname}</h4>
                </div>
                <ButtonOutline className='btn-profile py-2 px-4 hover:shadow-btnShadow dark:hover:shadow-btnDarkShadow'>
                    <i className='mr-4'><GiEgyptianProfile /></i>
                    <Link to='/profile' className='font-semibold text-xl'>Profile</Link>
                </ButtonOutline>
            </div>

            <div className="navbar__menu">
                <h4 className='title__menu mb-2 pl-10 font-medium text-xl hidden_elemenet'>Menus</h4>
                <ul className="list">
                    {
                        selectNav.map((select, index) => (
                            <li 
                                onClick={index === 5 ? handleLogout : null}
                                key={index}
                                className={`selectorNav hover:bg-slate-300 dark:hover:bg-slate-800 ${index === active ? 'active' : ''}`}
                            >
                                <Link className='link whitespace-nowrap' to={newMessage && index === 1 ? `/messenges/${newMessage.conversation}/${newMessage.userchat}` : select.path} >
                                    <i className='select__icon w-16 flex justify-center whitespace -nowrap'>{select.icons}</i>
                                    <span className='font-medium text-base whitespace-nowrap'>{select.display}</span>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>

            <div className="dark_mode mx-auto flex items-center justify-around border-4 rounded-lg mt-6 hidden_elemenet bg-lightMedium dark:bg-darkBold">
                <span className='text-xl text-black dark:text-white'><BsSun /></span>
                <div className="toggle ml-2 mr-2 ">
                    <label 
                        htmlFor="darkmode_button" 
                        className={`rounded-lg ${isDarkMode ? 'darkmodeActive' : ''}`}
                        onClick={handleDarkMode}
                    />
                </div>
                <span className='text-xl text-black dark:text-white'><MdOutlineDarkMode /></span>
            </div>

            <div className='justify-center mt-40 text-2xl show_up hidden'>
                <i
                    onClick={handleDarkMode}
                >
                    {isDarkMode ? <MdOutlineDarkMode /> : <BsSun />}
                </i>
            </div>
        </div>
    )
}

export default Navbar
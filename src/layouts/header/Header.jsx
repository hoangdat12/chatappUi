import React, {useState} from 'react'
import { Link } from 'react-router-dom'

import {FiSettings} from 'react-icons/fi'
import {BsTranslate ,BsKeyboard, BsPerson, BsChatLeftText} from 'react-icons/bs'
import {FiHelpCircle, FiLogOut, FiSend} from 'react-icons/fi'
import {IoSearchOutline} from 'react-icons/io5'

import Search from '../../components/search/Search'
import Avatar from '../../components/avatar/Avatar'
import Account from '../../components/account/Account'

import './header.scss'


const Profiles = [
    {
        display: 'Profile',
        path: '/profile',
        icons: <BsPerson />,
    },
    {
        display: 'Setting',
        path: '/setting',
        icons: <FiSettings />,
    },
    {
        display: 'VietNamese',
        path: '/vi',
        icons: <BsTranslate />,
    },
    {
        display: 'KeyBoard',
        path: '/key',
        icons: <BsKeyboard />,
    },
    {
        display: 'Help and Response',
        path: '/help',
        icons: <FiHelpCircle />,
    },
    {
        display: 'Logout',
        path: '/logout',
        icons: <FiLogOut />,
    },
]

const Header = () => {
    const theme = localStorage.getItem('theme')
    const profile = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : null

    const [activeLogo, setActiveLogo] = useState(false)
    const [searchInput, setSearchInput] = useState('')

    const handleActive = () => {
        setActiveLogo(!activeLogo)
    }
    
    return (
        <div className='header margin-navbar bg-light text-black duration-300 dark:bg-dark dark:text-white'>
            <div className="container mx-auto grid grid-cols-9 gap-2">
                <div className="col-span-2 flex items-center justify-start">
                    <Link to='/home' className="title font-bold text-3xl text-center cursor-pointer">HRadleyD</Link>
                </div>

                <div className="col-span-5 flex items-center">
                    <Search searchInput={searchInput} setSearchInput={setSearchInput} />
                </div>

                <div className="col-span-2 flex items-center justify-around ml-4">
                    <div className=' icons relative text-2xl cursor-pointer'>
                        <FiSend />
                        <div className=
                            {
                            `${theme === 'dark' ? '' : 'border-b-cl'} note shadow-2xl rounded-xl bg-dark text-white dark:bg-light dark:text-black`
                            }
                        >
                            Send
                        </div>
                    </div>

                    <div className='icons relative text-2xl cursor-pointer'>
                        <BsChatLeftText />
                        <div className=
                            {
                            `${theme === 'dark' ? '' : 'border-b-cl'} message__ note shadow-2xl rounded-xl bg-dark text-white dark:bg-light dark:text-black`
                            }
                        >
                            Message
                        </div>
                    </div>

{/* Bug overfolow hidden */}
                    <Avatar className='w-12 h-12' onClick={handleActive} image={`http://127.0.0.1:8000${profile.avatar}`}>
                        <ul className={`user__select bg-light dark:bg-dark rounded-xl shadow-2xl ${activeLogo ? 'activeLogo' : ''}`}>
                            {
                                Profiles.map((profile, index) => (
                                    <li key={index} className='profile_select hover:bg-slate-300 dark:hover:bg-slate-800'>
                                        <Link to={profile.path} className='flex items-center'>
                                            <i className='mr-4 text-lg'>{profile.icons}</i>
                                            <span className='font-semibold'>{profile.display}</span>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </Avatar>
                </div>
            </div>
        </div>
    )
}

export default Header

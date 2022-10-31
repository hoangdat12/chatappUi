import React, {useRef, useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

import {w3cwebsocket as W3CWebSocket} from 'websocket'

import {getConversations} from '../../redux/conversation/conversationSlice'
import { getMessages, createMessage, deleteMessage } from '../../redux/message/messageSlice'
import { messageDelete } from '../../redux/message/messageSlice'

import {IoCallSharp, IoEllipsisHorizontalSharp} from 'react-icons/io5'
import {FaVideo, FaInfo, FaIcons, FaSearch, FaFacebook, FaDotCircle, FaRegThumbsUp} from 'react-icons/fa'
import {BsPlusCircleFill} from 'react-icons/bs'
import {AiOutlineFileImage, AiOutlineGif, AiOutlineLink, AiTwotoneLike} from 'react-icons/ai'
import {SiIconify} from 'react-icons/si'
import {RiEditBoxLine, RiShareForwardLine} from 'react-icons/ri'
import {MdVideoCall, MdNotifications, MdNotificationsNone, MdOutlineReportProblem, MdInsertEmoticon} from 'react-icons/md'
import {ImSearch, ImFileText2, ImBlocked} from 'react-icons/im'
import {FiChevronDown, FiChevronUp} from 'react-icons/fi'
import {TbLetterCase} from 'react-icons/tb'

import Navbar from '../../layouts/navbar/Navbar'
import Account from '../../components/account/Account'
import Avatar from '../../components/avatar/Avatar'
import Input from '../../components/input/Input'
import {SelectorIcon} from '../../components/selector/Selector'

import './messenge.scss'

const Messenge = () => {
    const dispatch = useDispatch()
    const {id, userchat} = useParams()

    const {user} = useSelector((state) => state.auth)
    const profile = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : null
    // Create room name
    const room = user.id < userchat ? user.id + userchat : userchat + user.id

    const [hidden, setHidden] = useState(true)
    const [hidden1, setHidden1] = useState(true)
    const [hidden2, setHidden2] = useState(true)
    const [message, setMessage] = useState('')
    const [allMessage, setAllMessage] = useState([])

// Call api
    useEffect(() => {
        dispatch(getConversations(user.id))
    }, [user.id, dispatch])

    useEffect(() => {
        const data = {
            conversation : id,
            id: user.id
        }
        dispatch(getMessages(data))
    }, [dispatch, id, user.id])

// Get conversations and messages
    const {conversations} = useSelector((state) => state.conversation)

    const {messages} = useSelector((state) => state.message)

    const active = conversations.findIndex(e => e.userchat === parseInt(userchat) )
    
// Create Message
    const handleCreateMessage = () => {
        const data = {
            user: user.id,
            conversation: id,
            userchat: userchat,
            my_message: message,
            message: null,
        }
        // dispatch(messageCreate(data))
        dispatch(createMessage(data))
        setMessage('')
    }

// Enter send message
    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault()
            if (e.keyCode === 13 && message !== '') {
                handleCreateMessageTest()
                handleCreateMessage()
            }
        }
        document.addEventListener('keyup', enterEvent)
        return () => {
            document.removeEventListener('keyup', enterEvent)
        }
    })

// Delete Message
    const handleDeleteMessage = (id) => {
        dispatch(messageDelete(id))
        dispatch(deleteMessage(id))
    }

    const client = new W3CWebSocket(`ws://127.0.0.1:8000/ws/chat/${room}/`)

    useEffect(() => {
        const handleGetMessageTest = () => {
            client.onopen = () => {
                console.log('Connected is successfully')
            }
            client.onmessage = (message) => {
                const data = JSON.parse(message.data)
                if (data) {
                    setAllMessage(() => [...allMessage, data])
                }
            }
        }
        handleGetMessageTest()
    })

    const handleCreateMessageTest = () => {
        client.send(JSON.stringify({
            type: 'message',
            my_message: message,
            message: message,
            userchat: userchat,
            user: user.id 
        }))
    }

    return (
        <>
            <Navbar/>
            <div className="content__main2 message grid grid-cols-4 duration-300 bg-light text-black dark:bg-dark dark:text-white">
                <div className='col-span-1'>
                    <div className='flex items-center justify-between h-20 py-4 px-2'>
                        <Avatar className='w-10 h-10 overflow-hidden' image={profile && profile.avatar}/>
                        <span className='text-lg font-medium'>Chat</span>
                        <div className='flex items-center text-xl'>
                                <i className='p-2 mr-2 rounded-full bg-slate-300 dark:bg-slate-500 cursor-pointer'><MdVideoCall /></i>
                                <i className='p-2 rounded-full bg-slate-300 dark:bg-slate-500 cursor-pointer'><RiEditBoxLine /></i>
                        </div>
                    </div>
                    <div className='mx-4'>
                        <Input className='input_padding py-2 mb-4 mt-2 rounded-2xl' placeholder={'Search...'} icon1={<FaSearch />}/>
                    </div>
                    <div className='account__message px-4'>
                        {
                            conversations && conversations.map((conversation, index) => (
                                <Link key={index} to={`/messenges/${conversation.id}/${conversation.userchat}`}>
                                    <Account className={`${index === active ? 'bg-slate-300 dark:bg-slate-500' : ''} rounded-xl p-3 cursor-pointer`} nickName={conversation.nickname} name='Dang lam chi rua' image={conversation.avatar} />
                                </Link>
                            ))
                        }
                    </div>
                </div>

                <ContentMessage messages={messages} allMessage={allMessage}  value={message} onChange={setMessage} delete={handleDeleteMessage} user={user.id} userchat={userchat} />

                <div className='col-span-1'>
                    <div className='flex flex-col my-4 items-center'>
                        <Avatar className='w-16 h-16 overflow-hidden' image={profile && profile.avatar}/>
                        <h3 className='font-medium'>{profile && profile.nickname}</h3>
                        <p className='text-sm'>21 minus late</p>
                    </div>
                    <div className="icon flex justify-around">
                        <div className='flex flex-col items-center'>
                            <i className='text-xl p-2 rounded-full bg-slate-300 dark:bg-slate-500'><FaFacebook /></i>
                            <span className='font-medium'>Trang ca nhan</span>
                        </div>
                        <div className='flex flex-col items-center'>
                            <i className='text-xl p-2 rounded-full bg-slate-300 dark:bg-slate-500 '><MdNotifications /></i>
                            <span className='font-medium'>Thong bao</span>
                        </div>
                    </div>
                    <div className='mt-8'>
                        <div className='px-4' style={{minHeight: "40px"}}>
                            <div
                                onClick={() => setHidden(!hidden)}
                                className='flex items-center justify-between w-full text-medium cursor-pointer font-medium'
                            >
                                <span>Tuy chinh doan chat</span>
                                <span>{hidden ? <FiChevronDown /> : <FiChevronUp />}</span>
                            </div>
                            <div className={`${hidden ? 'hidden' : ''} pt-2`}>
                                <SelectorIcon name={'Change topic'} icon={<FaDotCircle />} />
                                <SelectorIcon name={'Change icons'} icon={<FaRegThumbsUp />} />
                                <SelectorIcon name={'Change nickname'} icon={<TbLetterCase />} />
                                <SelectorIcon name={'Search in conversation'} icon={<ImSearch />} />
                            </div>
                        </div>
                        <div className='px-4' style={{minHeight: "40px"}}>
                            <div
                                onClick={() => setHidden1(!hidden1)}
                                className='flex items-center justify-between w-full text-medium cursor-pointer font-medium'
                            >
                                <span>File va lien ket</span>
                                <span>{hidden1 ? <FiChevronDown /> : <FiChevronUp />}</span>
                            </div>
                            <div className={`${hidden1 ? 'hidden' : ''} pt-2`}>
                                <SelectorIcon  name={'File'} icon={<ImFileText2 />} />
                                <SelectorIcon  name={'Link'} icon={<AiOutlineLink />} />
                            </div>
                        </div>
                        <div className='px-4' style={{minHeight: "40px"}}>
                            <div
                                onClick={() => setHidden2(!hidden2)}
                                className='flex items-center justify-between w-full text-medium cursor-pointer font-medium'
                            >
                                <span>Quyen rieng tu, Ho tro</span>
                                <span>{hidden2 ? <FiChevronDown /> : <FiChevronUp />}</span>
                            </div>
                            <div className={`${hidden2 ? 'hidden' : ''} pt-2`}>
                                <SelectorIcon  name={'Turn off notification'} icon={<MdNotificationsNone />} />
                                <SelectorIcon  name={'Block'} icon={<ImBlocked />} />
                                <SelectorIcon  name={'Report'} icon={<MdOutlineReportProblem />} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const ContentMessage = (props) => {
    const messageRef = useRef(null)
    
    const [active, setActive] = useState(false)
    const [profileUserChat, setProfileUserChat] = useState(null)

    useEffect(() => {
        messageRef.current?.scrollIntoView()
    }, [])
    console.log(props.userchat)
    useEffect(() => {
        const getProfile = async () => {
            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            }
            const res = await axios.get(`http://127.0.0.1:8000/api/profile/user/${props.userchat}`, config)
            console.log('res', res)
            if (res.status === 200) {
                setProfileUserChat(res.data)
            }
        }
        getProfile()
    }, [props.userchat])
    console.log(profileUserChat)
    return (
        <div className='col-span-2 relative max-h-screen border border-slate-300 dark:border-slate-700'>
            <div className="name duration-300 z-50 absolute top-0 left-0 w-full flex justify-between items-center border-b bg-light dark:bg-dark border-slate-300 dark:border-slate-700 text-lg py-4 px-6 shadow-md">
                <Account nickName={profileUserChat && profileUserChat.nickname} name='21 minus later' image={`http://127.0.0.1:8000${profileUserChat && profileUserChat.avatar}`}/>
                <div className='flex text-xl'>
                    <i className='text-iconColor px-2 py-2 rounded-full hover:bg-slate-300 hover:dark:bg-slate-500 cursor-pointer'><IoCallSharp /></i>
                    <i className='text-iconColor px-2 py-2 rounded-full hover:bg-slate-300 hover:dark:bg-slate-500 cursor-pointer'><FaVideo /></i>
                    <i className='text-iconColor px-2 py-2 rounded-full hover:bg-slate-300 hover:dark:bg-slate-500 cursor-pointer'><FaInfo /></i>
                </div>
            </div>

            <div className="content p-2">
                {
                    props.messages && props.messages.map((message, index) => (
                        <div key={index}>
                            <div className={`message_hover flex items-center mb-5 text-md ${message.message ? '' : 'hidden'}`}>
                                <div className='flex items-center'>
                                    <Avatar className='w-10 h-10 overflow-hidden' image={`http://127.0.0.1:8000${profileUserChat && profileUserChat.avatar}`}/>
                                    <span className='py-2 px-3 ml-2 rounded-2xl bg-white dark:bg-mainDark'>{message.message}</span>
                                </div>
                                <div className='options duration-300 items-center cursor-pointer p-2 rounded-lg'>
                                    <i className='p-1 rounded-full hover:bg-slate-400'><MdInsertEmoticon /></i>
                                    <i className='p-1 rounded-full hover:bg-slate-400'><RiShareForwardLine /></i>
                                    <i onClick={() => setActive(!active)} className='p-1 rounded-full relative hover:bg-slate-400'>
                                        <IoEllipsisHorizontalSharp />
                                        <div className={`${active ? '' : 'hidden'} absolute flex flex-col bottom-8 rounded-lg py-2 px-2 bg-mainLight dark:bg-mainDark shadow-md`}>
                                            <span className='px-3 py-1 rounded-md duration-200 hover:bg-light dark:hover:bg-dark'>Forward</span>
                                            <span className='px-3 py-1 rounded-md duration-200 hover:bg-light dark:hover:bg-dark'>Delete</span>
                                        </div>
                                    </i>
                                </div>
                            </div>
                            <div className={`message_hover flex items-center justify-end mb-5 ${message.my_message ? '' : 'hidden'}`}>
                                <div className='options duration-300 items-center cursor-pointer p-2 rounded-lg'>
                                    <i onClick={() => setActive(!active)} className='p-1 rounded-full relative hover:bg-slate-400'>
                                        <IoEllipsisHorizontalSharp />
                                        <div className={`${active ? '' : 'hidden'} absolute flex flex-col right-0 bottom-8 rounded-lg py-2 px-2 bg-mainLight dark:bg-mainDark shadow-md`}>
                                            <span className='px-3 py-1 rounded-md duration-200 hover:bg-light dark:hover:bg-dark'>Forward</span>
                                            <span onClick={() => props.delete(message.id)} className='px-3 py-1 rounded-md duration-200 hover:bg-light dark:hover:bg-dark'>Delete</span>
                                        </div>
                                    </i>
                                    <i className='p-1 rounded-full hover:bg-slate-400'><RiShareForwardLine /></i>
                                    <i className='p-1 rounded-full hover:bg-slate-400'><MdInsertEmoticon /></i>
                                </div>
                                <span className='py-2 px-3 mr-2 rounded-2xl bg-white dark:bg-mainDark'>{message.my_message}</span>
                            </div>
                        </div>
                    ))
                }
                {
                    props.allMessage && props.allMessage.map((message, index) => (
                        <div key={index}>
                            <div className={`message_hover flex items-center mb-5 text-md ${String(message.user) === String(props.userchat) ? '' : 'hidden'}`}>
                                <div className='flex items-center'>
                                    <Avatar className='w-10 h-10' image={'https://thiepnhanai.com/wp-content/uploads/2021/05/hinh-anh-dai-dien-dep-1.jpg'}/>
                                    <span className='py-2 px-3 ml-2 rounded-2xl bg-white dark:bg-mainDark'>{message.message}</span>
                                </div>
                                <div className='options duration-300 items-center cursor-pointer p-2 rounded-lg'>
                                    <i className='p-1 rounded-full hover:bg-slate-400'><MdInsertEmoticon /></i>
                                    <i className='p-1 rounded-full hover:bg-slate-400'><RiShareForwardLine /></i>
                                    <i onClick={() => setActive(!active)} className='p-1 rounded-full relative hover:bg-slate-400'>
                                        <IoEllipsisHorizontalSharp />
                                        <div className={`${active ? '' : 'hidden'} absolute flex flex-col bottom-8 rounded-lg py-2 px-2 bg-mainLight dark:bg-mainDark shadow-md`}>
                                            <span className='px-3 py-1 rounded-md duration-200 hover:bg-light dark:hover:bg-dark'>Forward</span>
                                            <span className='px-3 py-1 rounded-md duration-200 hover:bg-light dark:hover:bg-dark'>Delete</span>
                                        </div>
                                    </i>
                                </div>
                            </div>
                            <div className={`message_hover flex items-center justify-end mb-5 ${String(message.user) === String(props.user) ? '' : 'hidden'}`}>
                                <div className='options duration-300 items-center cursor-pointer p-2 rounded-lg'>
                                    <i onClick={() => setActive(!active)} className='p-1 rounded-full relative hover:bg-slate-400'>
                                        <IoEllipsisHorizontalSharp />
                                        <div className={`${active ? '' : 'hidden'} absolute flex flex-col right-0 bottom-8 rounded-lg py-2 px-2 bg-mainLight dark:bg-mainDark shadow-md`}>
                                            <span className='px-3 py-1 rounded-md duration-200 hover:bg-light dark:hover:bg-dark'>Forward</span>
                                            <span onClick={() => props.delete(message.id)} className='px-3 py-1 rounded-md duration-200 hover:bg-light dark:hover:bg-dark'>Delete</span>
                                        </div>
                                    </i>
                                    <i className='p-1 rounded-full hover:bg-slate-400'><RiShareForwardLine /></i>
                                    <i className='p-1 rounded-full hover:bg-slate-400'><MdInsertEmoticon /></i>
                                </div>
                                <span className='py-2 px-3 mr-2 rounded-2xl bg-white dark:bg-mainDark'>{message.my_message}</span>
                            </div>
                        </div>
                    ))
                }
                <div ref={messageRef} />
            </div>

            <div className="input absolute bottom-4 left-0 w-full flex items-center">
                <div className="icons flex items-center text-xl">
                    <i className='text-iconColor px-2 py-2 rounded-full cursor-pointer hover:bg-slate-300 hover:dark:bg-slate-500 '><BsPlusCircleFill /></i>
                    <i className='text-iconColor px-2 py-2 rounded-full cursor-pointer hover:bg-slate-300 hover:dark:bg-slate-500 '><AiOutlineFileImage /></i>
                    <i className='text-iconColor px-2 py-2 rounded-full cursor-pointer hover:bg-slate-300 hover:dark:bg-slate-500 '><FaIcons /></i>
                    <i className='text-iconColor px-2 py-2 rounded-full cursor-pointer hover:bg-slate-300 hover:dark:bg-slate-500 '><AiOutlineGif /></i>
                </div>
                <Input className='input_padding rounded-2xl' placeholder={'Aa...'} icon1={<SiIconify />} value={props.value} onChange={props.onChange}/>
                <div className='mx-3 cursor-pointer text-2xl'>
                    <i className='text-iconColor'><AiTwotoneLike /></i>
                </div>
            </div>
        </div>
    )
}

export default Messenge
import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import commentService from '../../redux/comment/commentService'

import {AiOutlineLike, AiOutlineLink, AiOutlineSave, AiFillLike} from 'react-icons/ai'
import {RiShareForwardLine} from 'react-icons/ri'
import {GoComment} from 'react-icons/go'
import {IoImageOutline} from 'react-icons/io5'
import {SiIconify} from 'react-icons/si'
import {IoEllipsisHorizontalCircle} from 'react-icons/io5'
import {MdOutlineModeEditOutline} from 'react-icons/md'
import {BsFillTrashFill} from 'react-icons/bs'

import Account from '../../components/account/Account'
import Container from '../container/Container'
import Avatar from '../../components/avatar/Avatar'
import Image from '../../components/image/Image'
import Selector from '../../components/selector/Selector'
import Input from '../../components/input/Input'
import Modal from '../model/Model'
import Comment from '../comment/Comments'

const Posts = (props) => {
    return (
        <>
            {
                props.posts && props.posts.map((post, index) => (
                    <Container key={index}>
                        <Post profile={props.profile} post={post} onClick={props.onClick} />
                    </Container>
                ))
            }
        </>
    )
}

export const Post = (props) => {
    const {user} = useSelector((state) => state.auth)
    const profile = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : null
 
    const selectRef = useRef()

    const [activeLike, setActiveLike] = useState(false)
    const [active, setActive] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [listComment, setListComment] = useState(null)
    const [content, setContent] = useState('')
    const [likes, setLikes] = useState(null)

// Get all comment from post
    useEffect(() => {
        const getComment = async () => {
            const data = await commentService.getComment(props.post.id)

            if (data) {
                setListComment(data)
            }
        }
        getComment()
    }, [props.post.id])

    const createComment = () => {
        const data = {
            user: props.post.user,
            post: props.post.id,
            nickname: profile.nickname,
            avatar_url: profile.avatar,
            profile_comment: profile.id,
            content: content,
        }
        const res = commentService.createComment(data)
        setContent('')
        console.log(res)
    }

// Enter Post Comment
    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault()
            if (e.keyCode === 13 && content !== '') {
                createComment()
            }
        }
        document.addEventListener('keyup', enterEvent)
        return () => {
            document.removeEventListener('keyup', enterEvent)
        }
    })

// Get all Like
    useEffect(() => {
        const getLikes  = async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const res = await axios.get(`http://127.0.0.1:8000/api/like/count/${props.post.id}`, config)

            if (res.status === 200) {
                setLikes(res.data)
            }
        }
        const checkIsLike = async () => {
            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            }
            const body = {
                user: user.id
            }
            const res = await axios.post(`http://127.0.0.1:8000/api/like/check/${props.post.id}`, body, config)
            if (res.status === 200) {
                setActiveLike(res.data)
            }
        }
        getLikes()
        checkIsLike()
    }, [props.post.id, user.id])

// Create Like Post
    const handleCreateLikePost = async () => {
        const config = {
            'Content-type': 'application/json'
        }
        const body = {
            user: user.id,
            post: props.post.id
        }
        const res = await axios.post(`http://127.0.0.1:8000/api/like/create`, body, config)
        console.log(res.status)
    }

// Delete Like Post
    const handleDeleteLikePost = async () => {
        const config = {
            'Content-type': 'application/json'
        }
        const body = {
            user: user.id
        }
        const res = await axios.post(`http://127.0.0.1:8000/api/like/remove/${props.post.id}`, body, config)
        console.log(res.status)
    }


// Click outside hidden model
    useEffect(() => {
        const handler = (e) => {
            if (!selectRef.current.contains(e.target)) {
                setActive(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    })

// Handle active button like
    const handleActiveLike = () => {
        if (activeLike) {
            setLikes(likes - 1)
            handleDeleteLikePost()
        }
        else {
            setLikes(likes + 1)
            handleCreateLikePost()
        }
        setActiveLike(!activeLike)
    }
    return (
    <>
        <div className={props.className}>
            <div className='flex justify-between'>
                <Account name='10 minus late' nickName={props.post.username} image={`${props.post.avatar}`} />
                <div className='cursor-pointer relative'>
                    <i
                        onClick={() => setActive(!active)}
                    >
                        <IoEllipsisHorizontalCircle />
                    </i>
                    <ul ref={selectRef} className={`${active && user.id === props.post.user ? '' : 'hidden'} absolute duration-300 bottom-full right-0 mb-2 z-10 bg-dark rounded-xl`}>
                        <li 
                            onClick={() => props.onClick(props.post.id)}
                            className='p-2 text-sm hover:bg-slate-700'
                        >
                            <Link to='#' className='flex gap-2 items-center px-2'>
                                <span>Delete</span>
                                <span><BsFillTrashFill /></span>
                            </Link>
                        </li>
                        <li 
                            className='p-2 text-sm hover:bg-slate-700'
                        >
                            <Link onClick={() => setShowModal(true)} to='#' className='flex gap-2 items-center px-2'>
                                <span>Update</span>
                                <span><MdOutlineModeEditOutline /></span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="status py-6">
                <p className='text-xl font-medium '>{props.post.status}</p>
            </div>

            <div className="image rounded-2xl overflow-hidden">
                <Image className='' image={`${props.post.image}`} />
            </div>
            <div className={`flex justify-between ${likes === 0 ? 'hidden' : ''}`}>
                <div className='flex items-center'>
                    <span className='mr-2 p-1 rounded-full bg-sky-500'><AiFillLike /></span>
                    <span className='text-sm font-light'>{likes ? likes : null}</span>
                </div>
            </div>
            <div className="grid grid-cols-4 text-xl gap-2 my-4 py-3 border-y-2 border-slate-300 dark:border-slate-500">
                <div className='grid-rows-1'>
                    <Selector className='flex justify-center' name={'Comments'} icon={<GoComment />} pathname={'notActive'} />
                </div>
                <div className='grid-rows-1'>
                    <Selector className='flex justify-center' name={'Like'} icon={<AiOutlineLike />} active={activeLike} onClick={handleActiveLike} pathname={'notActive'} />
                </div>
                <div className='grid-rows-1'>
                    <Selector className='flex justify-center' name={'Share'} icon={<RiShareForwardLine />} pathname={'notActive'} />
                </div>
                <div className='grid-rows-1'>
                    <Selector className='flex justify-center' name={'Save'} icon={<AiOutlineSave />} pathname={'notActive'} />
                </div>
            </div>
            <div className="comments">
                <div className='flex mx-auto items-center text-sm '>
                    <i className='cursor-pointer text-xl mr-4 text-black dark:text-white'>
                        <Avatar className='w-12 h-12 overflow-hidden' image={profile.avatar} />
                    </i>
                    <Input className='rounded-2xl' value={content} onChange={setContent} placeholder='Comment...' icon1={<AiOutlineLink />} icon2={<SiIconify />} icon3={<IoImageOutline />} />
                </div>
            </div>
        </div>
        {
            listComment && listComment.map((comment, index) => (
                <Comment key={index} comment={comment}/>
            ))
        }
        <Modal showModal={showModal} setShowModal={setShowModal} status={props.post.status} image={`http://127.0.0.1:8000${props.post.image}`} id={props.post.id} />
        </>
    )
}

export default Posts
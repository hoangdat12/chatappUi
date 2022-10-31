import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { createPost, deletePost } from '../../redux/post/postSlice'
import { postCreate, postDelete } from '../../redux/post/postSlice'

import {AiFillPlusCircle} from 'react-icons/ai'

import Navbar from '../../layouts/navbar/Navbar'
import Avatar from '../../components/avatar/Avatar'
import Posts from '../../components/post/Post'
import Container from '../../components/container/Container'
import Introduce from '../../components/introduce/Introduce'
import { SelectorIcon } from '../../components/selector/Selector'
import Input from '../../components/input/Input'

import './profile.scss'

const MyProfile = () => {
    const dispatch = useDispatch()

    const profile = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : null

    const {postData} = useSelector((state) => state.post)
    const {user} = useSelector((state) => state.auth)

    const [image, setImage] = useState('')
    const [status, setStatus] = useState('')

    const handleOnchangeImage = (e) => {
        setImage(e.target.files[0])
    }

    const handleCreatePost = () => {
        const data = {
            user: user.id,
            status: status, 
            image: image.name
        }
        dispatch(postCreate(data))
        dispatch(createPost(data))
        setStatus('')
        window.scrollTo(0,0);
    }
    
    const handleDeletePost = (id) => {
        dispatch(postDelete(id))
        dispatch(deletePost(id))
        window.scrollTo(0,0);
    }
    
    return (
        <>
            <Navbar />
            <div className='content__main2 profile w-full h-screen duration-300 dark:bg-dark text-black dark:text-white'>
                <div className="cover__img relative" style={{backgroundImage: `url('https://i.pinimg.com/originals/2c/84/5a/2c845a66b8ad2a8aafd288bdc16cd459.jpg')`}}>
                    <div className='absolute' style={{bottom: '-25%', left: '10%'}}>
                        <Avatar className='h-44 w-44 overflow-hidden' image={profile.avatar} />
                    </div>
                </div>
                <div className='grid grid-cols-3 '>
                    <div className="col-span-1">

                    </div>
                    <div className="col-span-2 py-6">
                        <h2 className='font-semibold text-2xl'>{profile.nickname}</h2>
                        <p className='text-lg'>{profile.bio}</p>
                    </div>
                </div>
                <div className='grid grid-cols-3 duration-300 bg-slate-300 dark:bg-dark mb-3'>
                    <div className="col-span-1">
                        <Introduce />
                        <Container className='mx-3'>
                            <div className='flex justify-between items-center p-2'>
                                <h3 className='font-medium text-lg cursor-pointer'>Image</h3>
                                <span className='text-sky-500 cursor-pointer'>Show All Image</span>
                            </div>
                            <div className='flex flex-wrap gap-2 mt-2 justify-center'>
                                <div className='image w-44 h-44 overflow-hidden rounded-lg' style={{backgroundImage: `url('https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg')`}}></div>
                                <div className='image w-44 h-44 overflow-hidden rounded-lg' style={{backgroundImage: `url('https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg')`}}></div>
                                <div className='image w-44 h-44 overflow-hidden rounded-lg' style={{backgroundImage: `url('https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg')`}}></div>
                                <div className='image w-44 h-44 overflow-hidden rounded-lg' style={{backgroundImage: `url('https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg')`}}></div>
                            </div>
                        </Container>
                    </div>
                    <div className="col-span-2 mr-3 ">
                        <Container>
                            <div className='flex'>
                                <Avatar className='h-16 w-16' image={'https://toigingiuvedep.vn/wp-content/uploads/2021/01/avatar-dep-cute.jpg'} />
                                <div className='w-full  mx-3'>
                                    <Input 
                                        value={status}
                                        onChange={setStatus}
                                        className='rounded-xl' 
                                        placeholder={'Tell your friends about your thoughs...'}
                                    />
                                    <div className='flex justify-between mt-2'>
                                        <div className='select px-4 py-1 flex items-center'>
                                            <input 
                                                onChange={(e) => handleOnchangeImage(e)}
                                                type="file" 
                                            />
                                        </div>
                                        <div className='select px-4 py-1 rounded-xl bg-slate-200 dark:bg-slate-500'>
                                            <SelectorIcon onClick={handleCreatePost} className='text-yellow-900' name={'New Post'} icon={<AiFillPlusCircle />} />
                                        </div>
                                    </div>
                                    <div className="image rounded-2xl overflow-hidden">
                                        {/* <Image image={URL.createObjectURL(image)} /> */}
                                    </div>
                                </div>
                            </div>
                        </Container>
                        <Posts posts={postData} profile={profile} onClick={handleDeletePost} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyProfile
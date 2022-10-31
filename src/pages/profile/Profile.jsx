import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import profileService from '../../redux/profile/profileService'
import friendService from '../../redux/friend/friendService'
import postService from '../../redux/post/postService'

import {AiFillPlusCircle} from 'react-icons/ai'
import {IoPersonAdd, IoPerson} from 'react-icons/io5'
import {FaTelegramPlane} from 'react-icons/fa'

import Navbar from '../../layouts/navbar/Navbar'
import Avatar from '../../components/avatar/Avatar'
import Container from '../../components/container/Container'
import Introduce from '../../components/introduce/Introduce'
import Posts from '../../components/post/Post'
import { SelectorIcon } from '../../components/selector/Selector'
import Input from '../../components/input/Input'

import './profile.scss'

const Profile = () => {
    const {pId} = useParams()

    const {user} = useSelector( (state) => state.auth)

    const [profile, setProfile] = useState(null)
    const [listPost, setListPost] = useState(null)
    const [isFriend, setIsFriend] = useState(null)

    useEffect( () => {
        const getProfile = async () => {
            const data = await profileService.getProfile(pId)
            if (data) {
                setProfile(data)

                const posts = await postService.getPost(data.user)
                
                if (posts.data) {
                    setListPost(posts.data)
                }

                else {
                    setListPost(null)
                }
            }
        }

        const checkIsFriend = async () => {
            const data = {
                profile_id: pId,
                id: user.id
            }
            const res = await friendService.checkIsFriend(data)
            if (res.is_friend) {
                setIsFriend(res.is_friend)
            }
        }
        getProfile()
        checkIsFriend()
    }, [pId, user.id])

    return (
        <>
            <Navbar />
            <div className='content__main2 profile w-full h-screen duration-300 dark:bg-dark text-black dark:text-white'>
                <div className="cover__img relative" style={{backgroundImage: `url('https://i.pinimg.com/originals/2c/84/5a/2c845a66b8ad2a8aafd288bdc16cd459.jpg')`}}>
                    <div className='absolute' style={{bottom: '-25%', left: '10%'}}>
                        <Avatar className='h-44 w-44 overflow-hidden' image={profile ? profile.avatar : null} />
                    </div>
                </div>
                <div className='grid grid-cols-3 '>
                    <div className="col-span-1">

                    </div>
                    <div className="col-span-2 py-6 flex justify-between">
                        <div>
                            <h2 className='font-semibold text-2xl'>{profile ? profile.nickname : null}</h2>
                            <p className='text-lg'>{profile ? profile.bio : null}</p>
                        </div>
                        <div className='mr-20 cursor-pointer flex items-center gap-6'>
                            {
                                isFriend ? 
                                <span className='flex gap-2 items-center px-3 py-2 bg-cyan-400 rounded-lg'>
                                    <i><IoPerson/></i>
                                    <span>Friend</span>
                                </span>
                                : 
                                <span className='flex gap-2 items-center px-3 py-2 bg-cyan-400 rounded-lg'>
                                    <i><IoPersonAdd /></i>
                                    <span>Add Friend</span>
                                </span>
                            }
                            <span className='flex gap-2 items-center px-3 py-2 bg-cyan-400 rounded-lg'>
                                <i><FaTelegramPlane /></i>
                                <span>Message</span>
                            </span>
                        </div>
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
                                        className='rounded-xl' 
                                        placeholder={`Write something for ${profile ? profile.nickname : null}...`}
                                    />
                                    <div className='flex justify-between mt-2'>
                                        <div className='select px-4 py-1 flex items-center'>
                                            <input 
                                                type="file" 
                                            />
                                        </div>
                                        <div className='select px-4 py-1 rounded-xl bg-slate-200 dark:bg-slate-500'>
                                            <SelectorIcon className='text-yellow-900' name={'New Post'} icon={<AiFillPlusCircle />} />
                                        </div>
                                    </div>
                                    <div className="image rounded-2xl overflow-hidden">
                                        {/* <Image image={URL.createObjectURL(image)} /> */}
                                    </div>
                                </div>
                            </div>
                        </Container>
                        <Posts posts={listPost} profile={profile} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
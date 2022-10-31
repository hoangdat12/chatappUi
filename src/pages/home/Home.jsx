import React, {useEffect, useState} from 'react'
import axios from 'axios'

import {BiImage} from 'react-icons/bi'

import Navbar from '../../layouts/navbar/Navbar'
import Header from '../../layouts/header/Header'
import Suggestion from '../../layouts/suggestion/Suggestion'
import {Post} from '../../components/post/Post'
import Avatar from '../../components/avatar/Avatar'
import Container from '../../components/container/Container'

const Home = () => {
    const profile = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : null

    const [posts, setPosts] = useState(null)

    useEffect(() => {
        const getNewPost = async () => {
            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            }
            const res = await axios.get('http://127.0.0.1:8000/api/post', config)

            if (res.status === 200) {
                setPosts(res.data)
            }
        }

        getNewPost()
    }, [])

    return (
        <>  
            <Navbar />
            <Header />
            <div className="content__main py-8 duration-300 bg-light text-black dark:bg-dark dark:text-white">
                <Container className='w-4/5 mx-auto duration-300 bg-mainLight dark:bg-mainDark'>
                    <h3 className='font-semibold text-xl pb-4'>Post SomeThing</h3>
                    <div className="flex items-center pt-4 border-t border-slate-200 dark:border-slate-500 ">
                        <Avatar className='w-12' image={profile.avatar ? profile.avatar : null} />
                        <input className='outline-none border-none w-full py-2 px-2 mx-4 rounded-lg bg-transparent' type="text" placeholder={`What's on your mind...`} />
                        <i className='text-2xl cursor-pointer'><BiImage /></i>
                    </div>
                </Container>

                {
                    posts && posts.map( post => (
                        <Container key={post.id} className='w-4/5 mx-auto duration-300 bg-mainLight dark:bg-mainDark'>
                            <Post profile={profile} post={post} />
                        </Container>
                    ))
                }
                
            </div>
            <Suggestion />
        </>
    )
}

export default Home
import React from 'react'
import { useNavigate } from 'react-router-dom'

import Avatar from '../avatar/Avatar'

const Comment = (props) => {
    const navigate = useNavigate()
    const profile = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : null

    const handleNavigate = () => {
        navigate(`/profile/${profile.id === props.comment.profile_comment ? '' : props.comment.profile_comment}`)
        window.scroll(0,0)
    }

    return (
        <div className='comment flex mt-4 '>
            <div onClick={handleNavigate}><Avatar className='w-12 h-12 mr-4 overflow-hidden' image={props.comment.avatar || props.comment.avatar_url} /></div>
            <div className="content rounded-xl py-2 px-3 bg-white dark:bg-dark">
                <h3 className='text-lg font-semibold'>{props.comment.nickname}</h3>
                <p className='text-sm font-normal'>{props.comment.content}</p>
            </div>
        </div>
    )
}

export default Comment
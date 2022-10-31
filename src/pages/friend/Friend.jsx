import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Navbar from '../../layouts/navbar/Navbar'
import Header from '../../layouts/header/Header'
import Suggestion from '../../layouts/suggestion/Suggestion'
import { Accounts } from '../../components/account/Account'

const Friend = () => {
    const {friends} = useSelector((state) => state.friend)

    return (
        <>
            <Navbar />
            <Header />
            <div className="content__main py-8 duration-300 bg-light text-black dark:bg-dark dark:text-white">
                <div className="friend flex justify-center gap-4 flex-wrap w-full">
                    {
                        friends && friends.map((friend) => (
                            <Link key={friend.id} className='w-9/20' to={`/profile/${friend.profile}`}>
                                <Accounts nickname={friend.nickname} avatar={friend.avatar} />
                            </Link>
                        ))
                    }
                </div>
            </div>
            <Suggestion />
        </>
    )
}

export default Friend
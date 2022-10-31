import React from 'react'
import {useLocation, Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

import {AiOutlineHome, AiFillHome} from 'react-icons/ai'
import {TbUsers} from 'react-icons/tb'
import {BsCameraReels, BsCameraReelsFill} from 'react-icons/bs'
import {FaUserFriends, FaHashtag} from 'react-icons/fa'

import Button from '../../components/button/Button'
import Selector from '../../components/selector/Selector'
import Account from '../../components/account/Account'
import Image from '../../components/image/Image'
import Hastag from '../../components/hastag/Hastag'

import './suggestion.scss'

const Suggestion = () => {
    const {pathname} = useLocation()

    const {friends} = useSelector((state) => state.friend)

    return (
        <div className='suggest pb-6 duration-300 text-black bg-mainLight dark:bg-mainDark dark:text-white'>
            <ul className='pt-6 pb-4 border-b-2 border-grey'>
                <Selector className='pt-2 pb-2 pl-2 text-xl' pathname={pathname} path={'/home'} name={'For You'} icon={<AiOutlineHome />} icon2={<AiFillHome />}/>
                <Selector className='pt-2 pb-2 pl-2 text-xl' pathname={pathname} path={'/friends'} name={'Friends'} icon={<TbUsers />} icon2={<FaUserFriends />}/>
                <Selector className='pt-2 pb-2 pl-2 text-xl' pathname={pathname} path={'/live'} name={'Live'} icon={<BsCameraReels />} icon2={<BsCameraReelsFill />}/>
            </ul>
            <div className='py-4 border-b-2 border-grey'>
                <h3 className='pl-4 font-semibold text-neutral-400 pb-2'>Suggested accounts</h3>
                <ul className=''>
                    <Account className='py-3 cursor-pointer pl-8 hover:bg-slate-300 dark:hover:bg-slate-800' name={'Vo My Hanh'} nickName={'Myhanh62'} image={'https://toigingiuvedep.vn/wp-content/uploads/2021/01/avatar-dep-cute.jpg'} />
                    <Account className='py-3 cursor-pointer pl-8 hover:bg-slate-300 dark:hover:bg-slate-800' name={'Hoang Dat'} nickName={'hoangdat12'} image={'https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg'} />
                    <Account className='py-3 cursor-pointer pl-8 hover:bg-slate-300 dark:hover:bg-slate-800' name={'Vo My Hanh'} nickName={'Myhanh62'} image={'https://digitalfuture.vn/wp-content/uploads/2022/03/1647540180_691_555-Hinh-anh-avatar-dep-sieu-ngo-nghinh-moi-thoi.jpg'} />
                    <Account className='py-3 cursor-pointer pl-8 hover:bg-slate-300 dark:hover:bg-slate-800' name={'Vo My Hanh'} nickName={'Myhanh62'} image={'https://tophinhanh.com/wp-content/uploads/2021/12/1_anh-avatar-dep-cho-con-gai.jpg'} />
                </ul>
                <div className='button_view pt-2 pl-6'>
                    <Button className='bg-colorText py-1 px-4 text-sm font-medium'>View more</Button>
                </div>
            </div>

            <div className='py-4 border-b-2 border-grey'>
                <h3 className='pl-4 font-semibold text-neutral-400 pb-2'>Friends</h3>
                <ul className=''>
                {
                    friends ? friends.slice(0,4).map( (friend, index) => (
                        <Link key={index} to={`/profile/${friend.profile}`}>
                            <Account className='py-3 cursor-pointer pl-8 hover:bg-slate-300 dark:hover:bg-slate-800' name={'Vo My Hanh'} nickName={friend.nickname} image={friend.avatar} />
                        </Link>
                    )) : null
                }
                </ul>
                <Link to='/friends' className='block button_view pt-2 pl-6'>
                    <Button className='bg-colorText py-1 px-4 text-sm font-medium'>View more</Button>
                </Link>
            </div>

            <div className="py-4 border-b-2 border-grey">
                <h3 className='pl-4 font-semibold text-neutral-400 pb-4'>Searchs Trend</h3>
                <div className="px-6 gap-2 flex flex-wrap w-full pb-2">
                    <Hastag className='px-2 py-1 text-sm' icon={<FaHashtag />} name={'See you agian'} />
                    <Hastag className='px-2 py-1 text-sm' icon={<FaHashtag />} name={'See'} />
                    <Hastag className='px-2 py-1 text-sm' icon={<FaHashtag />} name={'See you'} />
                    <Hastag className='px-2 py-1 text-sm' icon={<FaHashtag />} name={'See you agian one more'} />
                    <Hastag className='px-2 py-1 text-sm' icon={<FaHashtag />} name={'Past lives'} />
                    <Hastag className='px-2 py-1 text-sm' icon={<FaHashtag />} name={'Manchester'} />
                </div>
            </div>

            <div className="pt-4">
                <h3 className='pl-4 font-semibold text-neutral-400 pb-4 '>Photos Trend</h3>
                <div className="photo grid grid-cols-2 gap-2">
                    <Image className='col-span-1'image={'https://lucdia2.vn/anh-4k-thien-nhien/imager_1_53459_700.jpg'} path={'/'} />
                    <Image className='col-span-1'image={'https://lucdia2.vn/anh-4k-thien-nhien/imager_1_53459_700.jpg'} path={'/'} />
                    <Image className='col-span-1'image={'https://lucdia2.vn/anh-4k-thien-nhien/imager_1_53459_700.jpg'} path={'/'} />
                    <Image className='col-span-1'image={'https://lucdia2.vn/anh-4k-thien-nhien/imager_1_53459_700.jpg'} path={'/'} />
                    <Image className='col-span-1'image={'https://lucdia2.vn/anh-4k-thien-nhien/imager_1_53459_700.jpg'} path={'/'} />
                    <Image className='col-span-1'image={'https://lucdia2.vn/anh-4k-thien-nhien/imager_1_53459_700.jpg'} path={'/'} />
                </div>
            </div>
        </div>
    )
}

export default Suggestion
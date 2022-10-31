import React from 'react'
import PropTypes from 'prop-types'

import {HiCheckCircle} from 'react-icons/hi'
import {IoEllipsisHorizontalSharp} from 'react-icons/io5'

import Avatar from '../avatar/Avatar'

import './account.scss'

const Account = (props) => {
    return (
        <li className={`${props.className} flex items-center`}>
            <Avatar className={`${props.width ? `w-${props.width} h-${props.width}` : 'w-10 h-10'} mr-4 h-10 overflow-hidden`} image={props.image} />
            <div className='flex flex-col justify-center'>
                <span className='font-medium flex'>
                    {props.nickName}
                    <i className='ml-2 text-cyan-400'><HiCheckCircle /></i>
                </span>
                <span className='text-sm font-thin'>{props.name}</span>
                {
                    props.script ? <span className='font-normal mt-3'>{props.script}</span> : null
                }
            </div>
        </li>
    )
}

export const Accounts = (props) => {
    return (
        <div className={`${props.className} flex justify-between items-center p-3 border border-slate-500`}>
            <Avatar className='w-20 h-20 rounded-lg overflow-hidden' image={props.avatar}/>
            <div className='flex flex-col justify-center'>
                <h2 className='text-xl font-semibold cursor-pointer'>{props.nickname}</h2>
                <div className='text-sm'>1000 flowers</div>
            </div>
            <div>
                <i className='cursor-pointer'><IoEllipsisHorizontalSharp /></i>
            </div>
        </div>
    )
}

Account.propTypes = {
    image : PropTypes.string,
    name: PropTypes.string,
    nickName: PropTypes.string,
    width: PropTypes.string,
    script: PropTypes.string
}

export default Account
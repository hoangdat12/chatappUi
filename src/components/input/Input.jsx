import React from 'react'
import PropTypes from 'prop-types'

import {BiErrorCircle} from 'react-icons/bi'

const Input = (props) => {
    return (
        <div className={`${props.className} flex items-center border-gray-300 border-2 py-3 px-6 w-full`}>
            <input 
                value={props.value}
                onChange={props.onChange ? (e) => props.onChange(e.target.value) : null}
                className='bg-transparent outline-none w-full'
                type="text" 
                placeholder={props.placeholder}
            />
            <i className='cursor-pointer text-gray-500 dark:text-white ml-2 text-xl'>{props.icon1}</i>
            <i className='cursor-pointer text-gray-500 dark:text-white ml-2 text-xl'>{props.icon2}</i>
            <i className='cursor-pointer text-gray-500 dark:text-white ml-2 text-xl'>{props.icon3}</i>
        </div>
    )
}

export const InputValidated = (props) => {
    return (
        <div className={`${props.className} flex flex-col mb-2`}> 
            <label className='font-medium mb-1' htmlFor="password">{props.label}</label>
            <input 
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                className={`${props.error ? 'error' : ''} py-2 px-4 rounded-xl outline-none w-full border border-t-sky-100`}
                type={props.type}
                placeholder={props.placeholder}
            />
            <div className={`${props.error ? '' : 'hidden'} flex items-center mt-1`}>
                <i className='text-red-500 mr-2 text-lg'><BiErrorCircle /></i>
                <span className='text-red-500 text-sm'>{props.errorMassage}</span>
            </div>
        </div>
    )
}

export const InputLabel = (props) => {
    return (
        <div className={`${props.className} flex flex-col mb-2`}> 
            <label className='font-medium mb-1' htmlFor="password">{props.label}</label>
            <input 
                value={props.value}
                name={props.name}
                onChange={(e) => props.onChange(e.target.value)}
                className={`py-2 px-4 rounded-xl outline-none w-full border border-t-sky-100`}
                type={props.type}
                placeholder={props.placeholder}
            />
        </div>
    )
}

export const InputLabel1 = (props) => {
    return (
        <div className={`${props.className} flex flex-col mb-2`}> 
            <label className='font-medium mb-1' htmlFor="password">{props.label}</label>
            <input 
                value={props.value}
                name={props.name}
                onChange={(e) => props.onChange(e)}
                className={`py-2 px-4 rounded-xl outline-none w-full border border-t-sky-100`}
                type={props.type}
                placeholder={props.placeholder}
            />
        </div>
    )
}

Input.propTypes = {
    icon1: PropTypes.element,
    icon2: PropTypes.element,
    icon3: PropTypes.element,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string
}

export default Input
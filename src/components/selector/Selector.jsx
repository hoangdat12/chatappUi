import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './selector.scss'

const Selector = (props) => {
    return (
        <li 
            onClick={() => props.onClick(!props.active)}
            className={`${props.pathname === props.path ? 'activeSelect' : ''} ${props.className}`}
        >
            <Link className='flex items-center' to={props.path ? props.path : '#'}>
                <i className={`${props.active ? 'text-sky-600' : ''} w-14 flex justify-center`}>{props.pathname === props.path ? props.icon2 || props.icon : props.icon}</i>
                <span className={`${props.active ? 'text-sky-600' : ''} font-medium`}>{props.name}</span>
            </Link>
        </li>
    )
}

export const SelectorIcon = (props) => {
    return (
        <li 
            onClick={props.onClick ? props.onClick : null}
            className='py-2'
        >
            <Link to='#' className='flex items-center'>
            <i className={`${props.className} mr-2 text-xl`}>{props.icon}</i>
                <span>{props.name}</span>
            </Link>
        </li>
    )
}

Selector.propTypes = {
    path: PropTypes.string,
    name: PropTypes.string, 
    icon: PropTypes.element,
    icon2: PropTypes.element,
    pathname: PropTypes.string,
    active: PropTypes.bool,
    onClick: PropTypes.func
}

export default Selector
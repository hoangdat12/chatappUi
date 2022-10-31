import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import './button.scss'

const Button = (props) => {
    return (
        <button 
            className={`${props.className} btn text-black dark:text-white`}
            onClick={props.onClick ? () => props.onClick() : null}
        >
            {props.children}
        </button>
    )
}

export const ButtonOutline = (props) => {
    return (
        <button 
            className={`${props.className} btn btn_outline border-black text-black dark:text-white dark:border-white`}
            onClick={props.onClick ? () => props.onClick() : null}
        >
            {props.children}
        </button>
    )
}

export const ButtonPage = (props) => {
    return (
        <button 
            onClick={props.onClick}
            className={`${props.className} px-4 py-3 mr-3 rounded-xl text-xl outline-none`} 
            style={{minWidth: '120px'}}
        >
            <Link to={props.path}>{props.name}</Link>
        </button>
    )
} 

Button.propTypes= {
    onClick: PropTypes.func,
}

export default Button
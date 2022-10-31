import React from 'react'
import PropTypes from 'prop-types'

const Avatar = (props) => {
    return (
        <div 
            className={`${props.className} rounded-full cursor-pointer relative`}
            onClick={props.onClick ? () => props.onClick() : null}
        >
            <img className='w-full rounded-full' src={props.image} alt="" />
            {props.children}
        </div>
    )
}

Avatar.propTypes = {
    onClick: PropTypes.func,
    image: PropTypes.string
}

export default Avatar
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Image = (props) => {
    return (
        <Link to={props.path ? props.path : '#'} className={`${props.className} overflow-hidden hover:opacity-80 duration-300`}>
            <img className='w-full' src={props.image ? props.image : null} alt="" />
        </Link>
    )
}

Image.propTypes = {
    image: PropTypes.string,
    path: PropTypes.string
}

export default Image
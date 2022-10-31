import React from 'react'
import PropTypes from 'prop-types'

const Hastag = (props) => {

  return (
    <div className={`${props.className} duration-300 cursor-pointer flex whitespace-nowrap items-center box-border w-fit border-2 border-gray-300 rounded-md hover:bg-slate-400`}>
        <i className='mr-2'>{props.icon}</i>
        <span className='opacity-80'>{props.name}</span>
    </div>  
  )
}

Hastag.propTypes = {
    name: PropTypes.string, 
    icon: PropTypes.element
}

export default Hastag
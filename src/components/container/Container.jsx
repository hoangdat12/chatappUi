import React from 'react'

const Container = (props) => {
    return (
        <div className={`${props.className} my-4 bg-slate-100 dark:bg-mainDark p-4 rounded-xl`} style={{boxShadow: '0 1px 2px #00000033'}}>
           {props.children}
        </div>
    )
}

export default Container
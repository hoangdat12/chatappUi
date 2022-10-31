import React, {useState} from "react"
import {useDispatch, useSelector} from 'react-redux'

import {updatePost} from '../../redux/post/postSlice'
// import { postUpdate } from "../../redux/post/postSlice";

import Image from "../image/Image";

const Modal = (props) => {
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth)

    const [value, setValue] = useState(props.status)
    const [file, setFile] = useState('')

    const handleUpdatePost = () => {
        console.log(value, file.name)
        if (value !== props.status || file !== '') {
            const data = {
                id: props.id,
                user: user.id,
                status: value, 
                image: file.name ? file.name : null
            }
            // dispatch(postUpdate(data))
            dispatch(updatePost(data))
            props.setShowModal(false)
        }
    }

    return (
        <>
        {props.showModal ? (
            <>
            <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full text-black bg-white dark:bg-modelColor dark:text-white outline-none focus:outline-none">
                    {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <input 
                                autoFocus
                                onChange={(e) => setValue(e.target.value)}
                                value={value} 
                                type="text" 
                                className="w-full outline-none border-none bg-transparent" 
                            />
                            <button
                            className="p-1 ml-auto bg-transparent border-0opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => props.setShowModal(false)}
                            >
                            <span className="bg-transparent opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                ×
                            </span>
                            </button>
                        </div>
                    {/*body*/}
                        <div className="py-2">
                            <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
                            <div className="image rounded-2xl py-6">
                                <Image className='w-full' image={props.image} />
                            </div>
                        </div>
                    {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => props.setShowModal(false)}
                            >
                                Close
                            </button>
                            <button
                                className="font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleUpdatePost}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
        ) : null}
        </>
    );
}


export default Modal
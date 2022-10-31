import React, {useRef, useEffect, useCallback, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'

import {IoSearchOutline} from 'react-icons/io5'
import {IoIosCloseCircleOutline} from 'react-icons/io'

import useDebounce from '../../hooks/useDebounce'

import Account from '../account/Account'

import './search.scss'

const arr = [1,2,3,4,5,6]

const Search = (props) => {
    const navigate = useNavigate()
    const inputRef = useRef()

    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const debouncedValue = useDebounce(props.searchInput);

    const handleDeleteSearchInput = () => {
        props.setSearchInput('')
        inputRef.current.focus()
    }

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const Search = async () => {
            setLoading(true)

            const res = await axios.get(`http://127.0.0.1:8000/api/user/search?search=${props.searchInput}`)

            setSearchResult(res.data)
            setLoading(false)
        }
        Search()
    }, [debouncedValue])

    const goToSearch = useCallback(
        () => {
            if (props.searchInput.trim().length > 0) {
                navigate(`/search/${props.searchInput}`);
                props.setSearchInput('')
            }
        },
        [props.searchInput, navigate]
    )

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault()
            if (e.keyCode === 13) {
                goToSearch()
            }
        }
        document.addEventListener('keyup', enterEvent)
        return () => {
            document.removeEventListener('keyup', enterEvent)
        }
    })
    console.log(searchResult)
    return (
        <div className='search flex mx-auto items-center border border-gray-300 text-gray-900 text-sm rounded-lg '>
            <i className='cursor-pointer text-xl mr-4 text-black dark:text-white'><IoSearchOutline /></i>
            <input 
                ref={inputRef}
                value={props.searchInput}
                onChange={(e) => props.setSearchInput(e.target.value)}
                className='outline-none border-none w-full text-black dark:text-white' 
                type="text" 
                placeholder='Search...'
            />
            <i 
                onClick={handleDeleteSearchInput}
                className='cursor-pointer text-black dark:text-white'
            >
                <IoIosCloseCircleOutline />
            </i>
            <div className={
                `search__result rounded-xl w-full shadow-2xl ${props.searchInput !== '' ? '' : 'hidden'} text-black bg-white dark:bg-dark dark:text-white`
            }>
                <ul className="result">
                    {
                        arr.map((result) => (
                            <li key={result} className='flex items-center hover:bg-slate-300 dark:hover:bg-slate-800 '>
                                <i className='cursor-pointer text-sm font-medium mr-4'><IoSearchOutline /></i>
                                <span className='name text-sm font-medium'>MyHanh12</span>
                            </li> 
                        ))
                    }
                </ul>

                <div className="accont">
                    <h3 className='opacity-75 mt-2 mb-2 text-lg font-medium ml-3'>Accounts</h3>
                    <ul>
                        {
                            searchResult && searchResult.slice(0,3).map(result => (
                                <Link key={result.id} to={`/profile/${result.id}`}>
                                    <Account className='hover:bg-slate-300 dark:hover:bg-slate-800' name={`${result.first_name} ${result.last_name} `} nickName={result.nickname} image={result.avatar} />
                                </Link>
                            ))
                        }
                    </ul>
                </div>

                <div className="view__all w-full h-12 text-xl font-medium hover:bg-slate-300 dark:hover:bg-slate-800">
                    View All
                </div>
            </div>
        </div>
    )
}

export default Search
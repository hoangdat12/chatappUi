import React, {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

import Navbar from '../../layouts/navbar/Navbar'
import Header from '../../layouts/header/Header'
import Suggestion from '../../layouts/suggestion/Suggestion'
import Container from '../../components/container/Container'
import Account from '../../components/account/Account'

import {IoMdPersonAdd} from 'react-icons/io'
import {FaRegUser} from 'react-icons/fa'

const Search = () => {
    const {keyword} = useParams()

    const [searchResult, setSearchResult] = useState(null)

    useEffect(() => {
        const getSearchResult = async () => {
            const config = {
                headers : {
                    'Content-type': 'application/json'
                }
            }
            const res = await axios.get(`http://127.0.0.1:8000/api/user/search?search=${keyword}`, config)

            if (res.status === 200) {
                setSearchResult(res.data)
            }
        }
        getSearchResult()
    }, [keyword])
    return (
        <>
            <Navbar />
            <Header />
            <div className="content__main py-8 duration-300 bg-light text-black dark:bg-dark dark:text-white">
                {
                    searchResult && searchResult.length !== 0 ? searchResult.map(result => (
                        <Link key={result.id} to={`/profile/${result.id}`}>
                            <Container className='relative w-4/5 mx-auto duration-300 cursor-pointer bg-mainLight dark:bg-mainDark'>
                                <Account width={'16'} image={result.avatar} nickName={result.nickname} name={result.first_name + " " + result.last_name} script={'IKON Media Inc. info@ikon88.com www.ikon88.com'}/>
                                <div className='absolute bottom-1/2 right-10 translate-y-1/2 text-2xl'><IoMdPersonAdd /></div>
                            </Container>
                        </Link>
                    ))
                    : 
                    <div className='flex items-center justify-center text-2xl font-semibold mt-20'>
                        <span className='pr-3'><FaRegUser /></span>
                        <h2>Can't find User</h2>
                    </div>
                }
            </div>
            <Suggestion />
        </>
    )
}

export default Search
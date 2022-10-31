import React from 'react'

import Container from '../container/Container'

import {FaInstagram} from 'react-icons/fa'
import {GiBasketballBall} from 'react-icons/gi'
import {MdAccessTimeFilled, MdLocationPin} from 'react-icons/md'
import {AiOutlineEye} from 'react-icons/ai'

import Hastag from '../../components/hastag/Hastag'
import { SelectorIcon } from '../../components/selector/Selector'

const Introduce = () => {
    return (
        <Container className='mx-3'>
            <div className='py-2'>
                <h3 className='font-medium text-lg'>Introduce</h3>
                <div className='w-full text-center tracking-widest'>BinhYen...</div>
            </div>
            <div>
                <ul className='mb-3'>
                    <SelectorIcon name={'From Hue City'} icon={<MdLocationPin />}/>
                    <SelectorIcon name={'Join Facebook from 2/9/2022'} icon={<MdAccessTimeFilled />}/>
                    <SelectorIcon name={'Fllower: 1300'} icon={<AiOutlineEye />}/>
                    <SelectorIcon name={'Instagram @myhanh12'} icon={<FaInstagram />}/>
                </ul>
            </div>
            <div className="hooby flex flex-wrap gap-2">
                <Hastag className='py-2 px-3' name={'Basketball'} icon={<GiBasketballBall />} />
                <Hastag className='py-2 px-3' name={'Basketball'} icon={<GiBasketballBall />} />
                <Hastag className='py-2 px-3' name={'Basketball'} icon={<GiBasketballBall />} />
                <Hastag className='py-2 px-3' name={'Basketball'} icon={<GiBasketballBall />} />
            </div>
        </Container>
    )
}

export default Introduce
'use client'

import React, { useContext, useEffect } from 'react'
import ResultTests from '../components/ResultTests'
import { faClockRotateLeft, faHourglassHalf } from '@fortawesome/free-solid-svg-icons'
import { myContext } from '../context/MyContext'
import axios from 'axios'
import { config } from 'dotenv'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { base_url_api, base_url_this } from '../../url_base'

config()

const Await = () => {

    const router = useRouter()

    const { name } = useContext(myContext)

    useEffect(() => {
        axios.get(`${base_url_api}/waiting-test`).then((res) => {
            const { left, right } = res.data
            console.log(left, right)
            if (right === '#RIGHT NG' || left === '#LEFT NG') {
                router.push('/negative')
            }
            if (right === '#RIGHT OK' && left === '#LEFT OK') {
                router.push('/positive')
            }
        }).catch((e) => {
            toast.error('Erro ao avaliar seu teste, por favor faça novamente!')
            console.log(e)
        })
    })

    return (
        <>
            <ResultTests
                text={`${name}, pode efetuar seu teste!`}
                icon={faHourglassHalf}
                colorIcon='#FFF510'
                icon2={faClockRotateLeft}
                colorIcon2='#FFF'
                type='await'
            />
        </>
    )
}

export default Await
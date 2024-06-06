'use client'

import React, { useContext } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faBoltLightning, faShoePrints } from '@fortawesome/free-solid-svg-icons'

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import { Button } from "../../components/ui/button"

import { myContext } from '../context/MyContext'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import { useRouter } from 'next/navigation';
import { base_url_api, base_url_this } from '../../url_base';

type ResultTestsProps = {
  text: any,
  icon: IconDefinition,
  colorIcon: string
  icon2: IconDefinition,
  colorIcon2: string,
  type: 'negative' | 'positive' | 'await'
}

const ResultTests = ({ text, icon, colorIcon, icon2, colorIcon2, type }: ResultTestsProps) => {

  const { id, name } = useContext(myContext)

  const handleResultTestSend = () => {
    axios.post(`${base_url_api}/send-results`, {
      registration: id,
      name: name,
      result: type
    }).then((res) => {
      toast.success('O resultado do seu teste foi salvo!')
    })
      .catch((err) => {
        console.log(err)
        toast.error('Erro ao salvar resultado do seu teste!')
      })
  }

  if (type === 'positive' || type === 'negative') {
    handleResultTestSend()
  }

  const router = useRouter()

  const handleClickBackBtn = () => {
    router.push(`${base_url_this}`)
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="flex justify-center items-center">
        <ToastContainer></ToastContainer>
        <div className="bg-[#071013] w-80 h-96 mr-12 rounded-lg flex flex-col justify-center items-center">
          <div className="flex">
            <FontAwesomeIcon icon={faBoltLightning} size='7x' color='#FFF' />
            <FontAwesomeIcon icon={faShoePrints} size='7x' color='#FFF' />

          </div>
          <div className="ml-28 -mt-4">
            <FontAwesomeIcon icon={icon} size='6x' color={colorIcon} />
          </div>
        </div>
        <div className='flex flex-col justify-center items-center text-[#071013]'>
          <div className="bg-[#071013] rounded-lg h-56 flex flex-col justify-center items-center w-80" >
            {
              type === 'await' && (
                <FontAwesomeIcon icon={icon2} color={colorIcon2} size='10x' />
              )
            }
            {
              type === 'negative' && (
                <p className='text-[#800E13] font-bold text-9xl'>NG</p>
              )
            }
            {
              type === 'positive' && (
                <p className='text-[#00b259] font-bold text-9xl'>OK</p>
              )
            }
          </div>
          <p className='text-2xl font-bold mt-8 w-96'>{text}</p>
        </div>

      </div>
      {
        type === 'positive' || type === 'negative' ? (
          <div className='flex justify-end ml-96 mt-2'>
            <Button className='mr-2' onClick={handleClickBackBtn}>Voltar</Button>
          </div>
        ) : <></>
      }
    </div>
  )
}

export default ResultTests
'use client'

import React, { ChangeEvent, useContext, useState } from 'react'
import axios from 'axios'
import { base_url_api, base_url_this } from '@/url_base'
import { myContext } from './context/MyContext'
import { useRouter } from 'next/navigation'

const App = () => {

  const { setName, setID, id } = useContext(myContext)

  const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setID(e.target.value)
  }

  const router = useRouter()

  const handleSearchId = async () => {
    await axios.get(`${base_url_api}/get-collaborator-name`, {
      params: {
        id: id
      }
    }).then(async (response) => {
      await setName(response.data.name)
      router.push(`${base_url_this}/await`)
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className="flex flex-col justify-center h-screen w-full items-center text-white">
      <div className="flex flex-col justify-center items-center bg-[#071013] h-96 rounded-xl">
        <h1 className='text-4xl font-bold'>Grupo MK</h1>
        <p className='text-sm mt-2'>Produção - Montagem automática</p>
        <p className='text-base mt-10 w-10/12'>Olá, para iniciar seu teste forneça o seu número de matricula.</p>
      </div>
      <input type="text" placeholder='Digite aqui seu número de matricula'
        className='w-[400px] pl-2 border-2 h-[40px] mt-4 text-black rounded-lg'
        onChange={handleIdChange} />
      <button
        className='bg-[#071013] rounded-lg h-[35px] w-[120px] text-center mt-2 ml-[250px] text-sm'
        onClick={handleSearchId}>Começar teste</button>
    </div>
  )
}

export default App
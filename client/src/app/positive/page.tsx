'use client'

import React, { useContext } from 'react'
import ResultTests from '../components/ResultTests'

import { faCircleCheck, faSmile } from '@fortawesome/free-solid-svg-icons'

import { myContext } from '../context/MyContext'
const Positive = () => {
  const { name } = useContext(myContext)
  return (
    <ResultTests
      text={`${name}, o resultado do seu teste foi positivo!`}
      icon={faCircleCheck}
      colorIcon='#00b259'
      icon2={faSmile}
      colorIcon2='#FFF'
      type='positive'
    />
  )
}

export default Positive
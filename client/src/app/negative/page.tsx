'use client'

import React, { useContext } from 'react'
import ResultTests from '../components/ResultTests'
import { faCircleXmark, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { myContext } from '../context/MyContext'

const Negative = () => {

    const { name } = useContext(myContext)
    return (
        <ResultTests
            text={`${name}, o resultado do seu teste foi negativo, por favor procurar o responsável para efetuar a troca do seu calçado.`}
            icon={faCircleXmark}
            colorIcon='#800E13'
            icon2={faTriangleExclamation}
            colorIcon2='#800E13'
            type='negative'
        />
    )
}

export default Negative
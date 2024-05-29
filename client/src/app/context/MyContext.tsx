'use client'

import { createContext, useState, SetStateAction } from "react";

type myContextProps = {
    id: string,
    setID: React.Dispatch<SetStateAction<string>>,
    name: string,
    setName: React.Dispatch<SetStateAction<string>>,
    resultLeft: string,
    setResultLeft: React.Dispatch<SetStateAction<string>>,
    resultRight: string,
    setResultRight: React.Dispatch<SetStateAction<string>>
}

const myContext = createContext({} as myContextProps)

const MyContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [id, setID] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [resultLeft, setResultLeft] = useState<string>('')
    const [resultRight, setResultRight] = useState<string>('')

    return (
        <myContext.Provider
            value={{
                id, setID,
                name, setName,
                resultLeft, setResultLeft,
                resultRight, setResultRight
            }}
        >
            <>
                {children}
            </>
        </myContext.Provider>
    )
}

export { MyContextProvider, myContext }
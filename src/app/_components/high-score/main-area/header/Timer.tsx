import { useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

type Props = {
    mode: 'training' | 'performance'
}

export const Timer = ({ mode }: Props) => {
    const [seconds, setSeconds] = useState(180)
    const [isActive, setIsActive] = useState(true)

    useEffect(() => {
        if (mode === 'training') return
        const interval = setInterval(() => {
            if (seconds === 0) return clearInterval(interval)
            setSeconds((prevSeconds) => prevSeconds - 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [isActive, seconds])

    return (
        <div className="absolute inset-x-0 m-auto flex w-52 text-center">
            <IconContext.Provider value={{ color: '#671f92' }}>
                <span className="absolute left-0 text-2xl">
                    <IoIosArrowBack />
                </span>
                <div className="inset-x-0 m-auto text-xl text-lightBrown">
                    {mode === 'training' ? '∞' : seconds}
                </div>
                <span className="absolute right-0 text-2xl">
                    <IoIosArrowForward />
                </span>
            </IconContext.Provider>
        </div>
    )
}

import { highScoreTimeLimit } from '@/app/_game-config/game'
import { useGameContext } from '@/app/_providers/GameProvider'
import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import { TfiInfinite } from 'react-icons/tfi'

type Props = {
    mode: 'training' | 'performance'
}

export const Timer = ({ mode }: Props) => {
    const [seconds, setSeconds] = useState(highScoreTimeLimit)
    const [isActive, setIsActive] = useState(true)
    const { setIsTimeOver } = useGameContext()

    const controls = useAnimation()

    const timeLimitAnimate = async () => {
        await controls.start({
            width: 208,
            transition: {
                duration: seconds,
                ease: 'linear',
            },
        })
    }

    useEffect(() => {
        if (mode === 'training') return
        timeLimitAnimate()
        const interval = setInterval(() => {
            if (seconds === 0) {
                setIsTimeOver(true)
                return clearInterval(interval)
            }
            setSeconds((prevSeconds) => prevSeconds - 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [isActive, seconds])

    return (
        <div className="absolute inset-x-0 m-auto flex w-52 flex-col text-center">
            <IconContext.Provider value={{ color: '#c1a56d', size: '28px' }}>
                <div className="inset-x-0 m-auto text-xl text-lightBrown">
                    {mode === 'training' ? <TfiInfinite /> : seconds}
                </div>
            </IconContext.Provider>
            <div className="mt-3 flex bg-slateGray text-left">
                <motion.span
                    initial={{ width: 0 }}
                    animate={controls}
                    className="inline-block h-1 bg-royalBlue"
                ></motion.span>
            </div>
        </div>
    )
}

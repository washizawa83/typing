import { useGameContext } from '@/app/_providers/GameProvider'
import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'
import { useEffect } from 'react'
import enemyIcon from '../../../../../../public/enemy.png'

export const Enemy = () => {
    const { score } = useGameContext()
    const controls = useAnimation()

    const damageAnimate = async () => {
        await controls.start({
            backgroundColor: '#9f2f2f',
            x: [0, 2, 0, 2, 0],
            y: [0, 2, 2, 0, 0],
            rotateZ: [0, 1, 0, -1, 0],
            transition: {
                duration: 0.3,
                ease: 'linear',
            },
        })
        await controls.start({
            backgroundColor: 'transparent',
            transition: {
                duration: 0,
                ease: 'linear',
            },
        })
    }

    useEffect(() => {
        if (score === 0) return
        damageAnimate()
    }, [score])

    return (
        <motion.div
            animate={controls}
            className="absolute inset-x-0 top-16 m-auto rounded-md border border-richPurple px-5 py-3"
        >
            <div className="flex items-center">
                <Image
                    className="rounded-full border border-enemy"
                    src={enemyIcon}
                    alt="enemy logo"
                    width={50}
                    height={50}
                />
                <h3 className="ml-5 text-enemy">Enemy</h3>
            </div>
        </motion.div>
    )
}

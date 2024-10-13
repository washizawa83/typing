import { BlackMage } from '@/app/_game-config/jobs'
import { LimitOfHeat } from '@/app/_game-config/skills'
import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import limitBreakIcon from '../../../../../../../public/limit-break.png'

type Props = {
    job: BlackMage
    onLimitBreakTimeOut: () => void
}

export const LimitBreakIcon = ({ job, onLimitBreakTimeOut }: Props) => {
    const limitBreakTimeSeconds = (job.skills.get('limitOfHeat') as LimitOfHeat)
        .limitBreakTimeSeconds
    const [isUnMount, setIsUnMount] = useState(false)
    const [limitBreakTime, setLimitBreakTime] = useState(limitBreakTimeSeconds)
    const controls = useAnimation()

    const flashing = async () => {
        await controls.start({
            opacity: [1, 0, 1],
            transition: {
                duration: 1,
                repeat: Infinity,
                ease: 'easeInOut',
            },
        })
    }

    const always = async () => {
        await controls.start({
            opacity: 1,
            transition: {
                duration: 0,
                ease: 'linear',
            },
        })
    }

    useEffect(() => {
        if (isUnMount) {
            onLimitBreakTimeOut()
        }
        const interval = setInterval(() => {
            setLimitBreakTime((currentLimitBreakTime) => {
                const nextLimitBreakTime = currentLimitBreakTime - 1
                if (nextLimitBreakTime === 0) {
                    setIsUnMount(true)
                    return 0
                }
                if (nextLimitBreakTime <= limitBreakTimeSeconds / 2) {
                    flashing()
                } else {
                    always()
                }
                return nextLimitBreakTime
            })
        }, 1000)
        return () => clearInterval(interval)
    }, [isUnMount])

    return (
        <motion.div animate={controls}>
            <Image
                src={limitBreakIcon}
                width={14}
                height={14}
                alt="title logo"
            />
        </motion.div>
    )
}

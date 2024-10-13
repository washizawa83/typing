import { BlackMage } from '@/app/_game-config/jobs'
import { useGameContext } from '@/app/_providers/GameProvider'
import { motion, useAnimation } from 'framer-motion'
import { Dispatch, SetStateAction, useEffect } from 'react'

type Props = {
    type: 'heat' | 'cold'
    job: BlackMage
    setIsGaugeVisible: Dispatch<SetStateAction<boolean>>
}

export const BlackMageStateGauge = ({
    type,
    job,
    setIsGaugeVisible,
}: Props) => {
    const { jobState, setJobState } = useGameContext()
    const levelGaugeControls = useAnimation()

    if (!BlackMage.isBlackMageState(jobState)) return

    useEffect(() => {
        const decrementLevel = async () => {
            await levelGaugeControls.start({
                width: 100,
                transition: {
                    duration: 0,
                    ease: 'linear',
                },
            })
            await levelGaugeControls.start({
                width: 0,
                transition: {
                    duration: jobState[type].duration,
                    ease: 'linear',
                },
            })

            job.updateJobStateByDuration(type, setJobState)
            setIsGaugeVisible(false)
        }

        decrementLevel()
    }, [])

    return (
        <motion.span
            className={`absolute border border-b-3 border-[#c1a56d] ${jobState[type].level <= 0 && 'hidden'}`}
            animate={levelGaugeControls}
        ></motion.span>
    )
}

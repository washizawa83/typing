import { BlackMage } from '@/app/_game-config/jobs'
import { useGameContext } from '@/app/_providers/GameProvider'
import { motion, useAnimation } from 'framer-motion'
import { Dispatch, SetStateAction, useEffect } from 'react'

type Props = {
    job: BlackMage
    setIsGaugeVisible: Dispatch<SetStateAction<boolean>>
}

export const BlackMageStateGauge = ({ job, setIsGaugeVisible }: Props) => {
    const { jobState, setJobState } = useGameContext()
    const heatLevelGaugeFirstControls = useAnimation()

    if (!BlackMage.isBlackMageState(jobState)) return

    useEffect(() => {
        const decrementHeatLevel = async () => {
            await heatLevelGaugeFirstControls.start({
                width: 100,
                transition: {
                    duration: 0,
                    ease: 'linear',
                },
            })
            await heatLevelGaugeFirstControls.start({
                width: 0,
                transition: {
                    duration: jobState.heat.heatLevelDuration,
                    ease: 'linear',
                },
            })

            job.updateJobStateByDuration('heat', setJobState)
            setIsGaugeVisible(false)
        }

        decrementHeatLevel()
    }, [])

    return (
        <motion.span
            className={`absolute border border-b-3 border-[#c1a56d] ${jobState.heat.heatLevel <= 0 && 'hidden'}`}
            animate={heatLevelGaugeFirstControls}
        ></motion.span>
    )
}

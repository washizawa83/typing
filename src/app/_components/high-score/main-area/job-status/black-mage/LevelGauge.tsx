import { BlackMageStateGauge } from '@/app/_components/high-score/main-area/job-status/black-mage/BlackMageStateGauge'
import { LimitBreakIcon } from '@/app/_components/high-score/main-area/job-status/black-mage/LimitBreakIcon'
import { StateIcon } from '@/app/_components/high-score/main-area/job-status/black-mage/StateIcon'
import { BlackMage } from '@/app/_game-config/jobs'
import { useGameContext } from '@/app/_providers/GameProvider'
import { useEffect, useState } from 'react'

type Props = {
    type: 'heat' | 'cold'
    maxLevel: number
    maxLevelByLimitBreak: number
    level: number
    isLimitBreak: boolean
    job: BlackMage
    style: {
        activeColor: string
        inActiveColor: string
        limitBreakColor: string
    }
}

export const LevelGauge = ({
    type,
    maxLevel,
    maxLevelByLimitBreak,
    level,
    isLimitBreak,
    job,
    style,
}: Props) => {
    const { jobState, setJobState } = useGameContext()
    const [isGaugeVisible, setIsGaugeVisible] = useState(false)

    useEffect(() => {
        if (level > 0 && !isGaugeVisible) {
            setIsGaugeVisible(true)
        }
    }, [jobState])

    const handleLimitBreakTimeOut = () => {
        setJobState((currentJobState) => {
            if (!BlackMage.isBlackMageState(currentJobState))
                return currentJobState
            return {
                ...currentJobState,
                [type]: {
                    ...currentJobState[type],
                    level:
                        currentJobState[type].level > BlackMage.maxTypeLevel
                            ? BlackMage.maxTypeLevel
                            : currentJobState[type].level,
                    isLimitBreak: false,
                },
            }
        })
    }

    return (
        <div>
            <div className="flex items-center">
                <StateIcon type={type} />
                <ul className="flex flex-wrap-reverse">
                    {[...Array(maxLevelByLimitBreak)].map((_, index) =>
                        index < maxLevel ? (
                            <li
                                key={index}
                                className={`h-5 w-1 ${level >= index + 1 ? style.activeColor : style.inActiveColor} m-2`}
                            ></li>
                        ) : (
                            isLimitBreak && (
                                <li
                                    key={index}
                                    className={`h-7 w-1 ${level >= index + 1 ? style.limitBreakColor : style.inActiveColor} m-2`}
                                ></li>
                            )
                        ),
                    )}
                </ul>
                {isLimitBreak && (
                    <LimitBreakIcon
                        job={job}
                        onLimitBreakTimeOut={handleLimitBreakTimeOut}
                    />
                )}
            </div>
            {isGaugeVisible && (
                <BlackMageStateGauge
                    type={type}
                    job={job}
                    setIsGaugeVisible={setIsGaugeVisible}
                />
            )}
        </div>
    )
}

import { BlackMageStateGauge } from '@/app/_components/high-score/main-area/job-status/black-mage/BlackMageStateGauge'
import { LimitBreakIcon } from '@/app/_components/high-score/main-area/job-status/black-mage/LimitBreakIcon'
import { BlackMage } from '@/app/_game-config/jobs'
import { useGameContext } from '@/app/_providers/GameProvider'
import { useEffect, useState } from 'react'

type Props = {
    job: BlackMage
}

export const BlackMageJobState = ({ job }: Props) => {
    const { jobState, setJobState } = useGameContext()
    const [isGaugeVisible, setIsGaugeVisible] = useState(false)

    if (!BlackMage.isBlackMageState(jobState)) return

    useEffect(() => {
        if (jobState.heat.heatLevel > 0 && !isGaugeVisible) {
            setIsGaugeVisible(true)
        }
    }, [jobState])

    const handleLimitBreakTimeOut = () => {
        setJobState((currentJobState) => {
            if (!BlackMage.isBlackMageState(currentJobState))
                return currentJobState
            return {
                ...currentJobState,
                heat: {
                    ...currentJobState.heat,
                    heatLevel:
                        currentJobState.heat.heatLevel >
                        BlackMage.maximumHeatLevel
                            ? BlackMage.maximumHeatLevel
                            : currentJobState.heat.heatLevel,
                    isLimitBreak: false,
                },
            }
        })
    }

    return (
        <div>
            <div className="flex items-center">
                <ul className="flex flex-wrap-reverse">
                    {[...Array(BlackMage.maximumHeatLevelByLimitBreak)].map(
                        (_, index) =>
                            index < BlackMage.maximumHeatLevel ? (
                                <li
                                    key={index}
                                    className={`h-5 w-1 ${jobState.heat.heatLevel >= index + 1 ? 'bg-heat' : 'bg-[#5c4b4b]'} m-2`}
                                ></li>
                            ) : (
                                jobState.heat.isLimitBreak && (
                                    <li
                                        key={index}
                                        className={`h-7 w-1 ${jobState.heat.heatLevel >= index + 1 ? 'bg-[#4632eb]' : 'bg-[#5c4b4b]'} m-2`}
                                    ></li>
                                )
                            ),
                    )}
                </ul>
                {jobState.heat.isLimitBreak && (
                    <LimitBreakIcon
                        job={job}
                        onLimitBreakTimeOut={handleLimitBreakTimeOut}
                    />
                )}
            </div>
            {isGaugeVisible && (
                <BlackMageStateGauge
                    job={job}
                    setIsGaugeVisible={setIsGaugeVisible}
                />
            )}
        </div>
    )
}

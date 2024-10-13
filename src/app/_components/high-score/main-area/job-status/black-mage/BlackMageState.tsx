import { LevelGauge } from '@/app/_components/high-score/main-area/job-status/black-mage/LevelGauge'
import { BlackMage } from '@/app/_game-config/jobs'
import { useGameContext } from '@/app/_providers/GameProvider'

type Props = {
    job: BlackMage
}

export const BlackMageJobState = ({ job }: Props) => {
    const { jobState } = useGameContext()

    if (!BlackMage.isBlackMageState(jobState)) return

    return (
        <div>
            <LevelGauge
                type="heat"
                maxLevel={BlackMage.maxTypeLevel}
                maxLevelByLimitBreak={BlackMage.maxTypeLevelByLimitBreak}
                level={jobState.heat.level}
                isLimitBreak={jobState.heat.isLimitBreak}
                job={job}
                style={{
                    activeColor: 'bg-heat',
                    inActiveColor: 'bg-[#5c4b4b]',
                    limitBreakColor: 'bg-[#4632eb]',
                }}
            />
            <LevelGauge
                type="cold"
                maxLevel={BlackMage.maxTypeLevel}
                maxLevelByLimitBreak={BlackMage.maxTypeLevelByLimitBreak}
                level={jobState.cold.level}
                isLimitBreak={jobState.cold.isLimitBreak}
                job={job}
                style={{
                    activeColor: 'bg-cold',
                    inActiveColor: 'bg-[#4b535c]',
                    limitBreakColor: 'bg-[#4632eb]',
                }}
            />
        </div>
    )
}

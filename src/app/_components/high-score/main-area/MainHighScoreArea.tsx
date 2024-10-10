import { MainAreaHeader } from '@/app/_components/high-score/main-area/header/MainAreaHeader'
import { InvokeSkillStack } from '@/app/_components/high-score/main-area/InvokeSkillStack'
import { JobState } from '@/app/_components/high-score/main-area/job-status/JobStateWrap'
import { BackMage } from '@/app/_game-config/jobs'
import type { BaseSkill } from '@/app/_game-config/skills'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
    invokeSkills: BaseSkill[]
    setInvokeSkills: Dispatch<SetStateAction<BaseSkill[]>>
    mode: 'training' | 'performance'
    score: number
}

export const MainHighScoreArea = ({
    invokeSkills,
    setInvokeSkills,
    mode,
    score,
}: Props) => {
    return (
        <div className="relative h-80 w-full">
            <div className="absolute size-full">
                <MainAreaHeader mode={mode} score={score} />
                <JobState
                    job={
                        new BackMage({
                            heat: {
                                heatLevel: 0,
                                heatLevelDuration: 10,
                                isLimitBleak: false,
                            },
                        })
                    }
                />
                <InvokeSkillStack
                    invokeSkills={invokeSkills}
                    setInvokeSkills={setInvokeSkills}
                />
            </div>
        </div>
    )
}

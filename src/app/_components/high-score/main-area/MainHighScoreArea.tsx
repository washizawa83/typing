import { InvokeSkillStack } from '@/app/_components/high-score/main-area/InvokeSkillStack'
import type { BaseSkill } from '@/app/_service/skill'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
    invokeSkills: BaseSkill[]
    setInvokeSkills: Dispatch<SetStateAction<BaseSkill[]>>
}

export const MainHighScoreArea = ({ invokeSkills, setInvokeSkills }: Props) => {
    return (
        <div className="relative h-72 w-full">
            <div className="absolute size-full">
                <InvokeSkillStack
                    invokeSkills={invokeSkills}
                    setInvokeSkills={setInvokeSkills}
                />
            </div>
        </div>
    )
}

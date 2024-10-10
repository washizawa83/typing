import { InvokeSkill } from '@/app/_components/high-score/main-area/InvokeSkill'
import type { BaseSkill } from '@/app/_game-config/skills'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
    invokeSkills: BaseSkill[]
    setInvokeSkills: Dispatch<SetStateAction<BaseSkill[]>>
}

export const InvokeSkillStack = ({ invokeSkills, setInvokeSkills }: Props) => {
    return (
        <div className="absolute bottom-0 right-0 h-72 w-60">
            <div className="flex-end flex h-72 flex-col justify-end">
                {invokeSkills.map((skill) => (
                    <InvokeSkill
                        key={skill.name}
                        skill={skill}
                        setInvokeSkills={setInvokeSkills}
                    />
                ))}
            </div>
        </div>
    )
}

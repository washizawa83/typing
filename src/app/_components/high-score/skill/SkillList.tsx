'use client'
import { SkillIcon } from '@/app/_components/high-score/skill/SkillIcon'
import type { SkillStatus } from '@/app/_components/pages/HighScorePageComponent'
import type { BaseSkill } from '@/app/_service/skill'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
    skills: BaseSkill[]
    completedCommand: string | null
    setSkillStates: Dispatch<SetStateAction<Record<string, SkillStatus>>>
    setInvokeSkills: Dispatch<SetStateAction<BaseSkill[]>>
}

export const SkillList = ({
    skills,
    completedCommand,
    setSkillStates,
    setInvokeSkills,
}: Props) => {
    return (
        <div>
            <h3 className="mb-3 border-b border-[#671f92] pb-1">Skills</h3>
            <ul>
                {skills.map((skill) => (
                    <SkillIcon
                        key={skill.name}
                        skill={skill}
                        invoke={skill.name === completedCommand}
                        setSkillStates={setSkillStates}
                        setInvokeSkills={setInvokeSkills}
                    />
                ))}
            </ul>
        </div>
    )
}

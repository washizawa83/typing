'use client'
import { SkillIcon } from '@/app/_components/high-score/skill/SkillIcon'
import type { SkillStatus } from '@/app/_components/pages/HighScorePageComponent'
import type { AttackSkill, BaseSkill } from '@/app/_game-config/skills'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
    skills: AttackSkill[]
    completedCommand: string | null
    setSkillStates: Dispatch<SetStateAction<Record<string, SkillStatus>>>
    setInvokeSkills: Dispatch<SetStateAction<BaseSkill[]>>
    setScore: Dispatch<SetStateAction<number>>
}

export const SkillList = ({
    skills,
    completedCommand,
    setSkillStates,
    setInvokeSkills,
    setScore,
}: Props) => {
    return (
        <div>
            <h3 className="mb-3 border-b border-richPurple pb-1">Skills</h3>
            <ul>
                {skills.map((skill) => (
                    <SkillIcon
                        key={skill.name}
                        skill={skill}
                        invoke={skill.name === completedCommand}
                        setSkillStates={setSkillStates}
                        setInvokeSkills={setInvokeSkills}
                        setScore={setScore}
                    />
                ))}
            </ul>
        </div>
    )
}

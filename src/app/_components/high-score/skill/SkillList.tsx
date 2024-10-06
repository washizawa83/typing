'use client'
import { SkillIcon } from '@/app/_components/high-score/skill/SkillIcon'
import type { BaseSkill } from '@/app/_service/skill'

type Props = {
    skills: BaseSkill[]
    completedCommand: string | null
}

export const SkillList = ({ skills, completedCommand }: Props) => {
    return (
        <div>
            <h3 className="mb-3 border-b border-[#671f92] pb-1">Skills</h3>
            <ul>
                {skills.map((skill) => (
                    <SkillIcon
                        key={skill.name}
                        skill={skill}
                        invoke={skill.name === completedCommand}
                    />
                ))}
            </ul>
        </div>
    )
}

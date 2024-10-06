'use client'
import { SkillIcon } from '@/app/_components/high-score/SkillIcon'
import type { BaseSkill } from '@/app/_service/skill'

type Props = {
    skills: BaseSkill[]
}

export const SkillList = ({ skills }: Props) => {
    return (
        <div>
            <h3 className="mb-3 border-b border-[#671f92] pb-1">Skills</h3>
            <ul>
                {skills.map((skill) => (
                    <SkillIcon key={skill.name} skill={skill} />
                ))}
            </ul>
        </div>
    )
}

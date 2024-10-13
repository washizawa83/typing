'use client'
import { SkillIcon } from '@/app/_components/high-score/skill/SkillIcon'
import type { AttackSkill } from '@/app/_game-config/skills'

type Props = {
    skills: AttackSkill[]
    completedCommand: string | null
}

export const SkillList = ({ skills, completedCommand }: Props) => {
    const skillsMapByType = skills.reduce(
        (acc, skill) => {
            if (!acc.get(skill.type)) {
                acc.set(skill.type, [])
            }
            acc.get(skill.type)?.push(skill)
            return acc
        },
        new Map() as Map<string, AttackSkill[]>,
    )

    return (
        <div>
            <h3 className="mb-3 border-b border-richPurple pb-1">Skills</h3>
            <div className="flex">
                {Array.from(skillsMapByType.entries()).map(([type, skill]) => {
                    return (
                        <div
                            key={type}
                            className="flex flex-col w-32 items-center"
                        >
                            <h3 key={type} className="mb-3">
                                {type}
                            </h3>
                            <ul>
                                {skill.map((skill) => (
                                    <SkillIcon
                                        key={skill.id}
                                        skill={skill}
                                        invoke={
                                            skill.suggestName ===
                                            completedCommand
                                        }
                                    />
                                ))}
                            </ul>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

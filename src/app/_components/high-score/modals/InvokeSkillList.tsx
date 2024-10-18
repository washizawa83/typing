import type { BaseSkill } from '@/app/_game-config/skills'
import Image from 'next/image'

type Props = {
    invokeSkills: BaseSkill[]
}

export const InvokeSkillList = ({ invokeSkills }: Props) => {
    return (
        <div className="">
            <h2 className="border-l-4 border-richPurple pl-3">Invoke Skills</h2>
            <ul className="h-72 overflow-y-auto">
                {invokeSkills.reverse().map((skill, index) => (
                    <li
                        key={index}
                        className="flex items-center border-b border-richPurple p-2"
                    >
                        <div>
                            <span>{index}</span>
                        </div>
                        <div className="ml-10 w-8 overflow-hidden rounded-md">
                            <Image
                                key={skill.id}
                                src={skill.iconUrl}
                                alt="skill logo"
                                width={32}
                                height={32}
                            />
                        </div>
                        <div className="ml-10">
                            <h2>{skill.displayName}</h2>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

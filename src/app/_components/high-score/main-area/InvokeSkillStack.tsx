import { InvokeSkill } from '@/app/_components/high-score/main-area/InvokeSkill'
import { useGameContext } from '@/app/_providers/GameProvider'

export const InvokeSkillStack = () => {
    const { invokedSkillLogs, setInvokedSkillLogs } = useGameContext()
    return (
        <div className="absolute bottom-0 right-0 h-72 w-60">
            <div className="flex-end flex h-72 flex-col justify-end">
                {invokedSkillLogs.map((skill) => (
                    <InvokeSkill
                        key={skill.id}
                        skill={skill}
                        setInvokeSkills={setInvokedSkillLogs}
                    />
                ))}
            </div>
        </div>
    )
}

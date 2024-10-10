'use client'
import { HighScoreHeader } from '@/app/_components/high-score/HighScoreHeader'
import { MainHighScoreArea } from '@/app/_components/high-score/main-area/MainHighScoreArea'
import { SkillList } from '@/app/_components/high-score/skill/SkillList'
import { SuggestCommand } from '@/app/_components/high-score/suggest/SuggestCommand'
import { BasePage } from '@/app/_components/layouts/BasePage'
import type { AttackSkill, BaseSkill } from '@/app/_game-config/skills'
import { Heat, LimitOfHeat, OverHeat } from '@/app/_game-config/skills'
import { CommandManager } from '@/app/_service/command-manager'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Props = {
    mode: 'training' | 'performance'
}

export interface SkillStatus {
    isAvailable: boolean
}

const mockSkillSets: AttackSkill[] = [
    new Heat(),
    new OverHeat(),
    new LimitOfHeat(),
]

const createSkillMap = () => {
    return mockSkillSets.reduce<Record<string, SkillStatus>>((acc, skill) => {
        acc[skill.name] = { isAvailable: true }
        return acc
    }, {})
}

export const HighScorePageComponent = ({ mode }: Props) => {
    const [completedCommand, setCompletedCommand] = useState<string | null>(
        null,
    )
    const [entryKeys, setEntryKeys] = useState('')
    const [filteredAcceptedCommands, setFilteredAcceptedCommands] = useState<
        string[]
    >(mockSkillSets.map((skill) => skill.name))
    const [skillStates, setSkillStates] = useState(createSkillMap())
    const [invokeSkills, setInvokeSkills] = useState<BaseSkill[]>([])
    const [score, setScore] = useState(0)

    const router = useRouter()
    const commandManager = new CommandManager(mockSkillSets)

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.shiftKey && event.location === 1) return
            if (event.key === 'Escape') return router.push('/pages/home/')

            commandManager.addEntryKeys(event.key)
            setFilteredAcceptedCommands(commandManager.searchAcceptedCommands())
            setEntryKeys(commandManager.getEntryKeys())

            if (commandManager.getCompletedCommand()) {
                setCompletedCommand(commandManager.getCompletedCommand())
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    const handleResetSuggest = () => {
        setTimeout(() => {
            commandManager.resetFilteredAcceptedCommands()
            commandManager.resetEntryKeys()
            setFilteredAcceptedCommands(commandManager.getAcceptedCommands())
            setEntryKeys('')
            setCompletedCommand(null)
        }, 100)
    }

    return (
        <BasePage>
            <div>
                <HighScoreHeader mode={mode} />
                <MainHighScoreArea
                    invokeSkills={invokeSkills}
                    setInvokeSkills={setInvokeSkills}
                    mode={mode}
                    score={score}
                />
                <SuggestCommand
                    filteredAcceptedCommands={filteredAcceptedCommands}
                    entryKeys={entryKeys}
                    completedCommand={completedCommand}
                    resetSuggest={handleResetSuggest}
                    skillStates={skillStates}
                />
                <SkillList
                    skills={mockSkillSets}
                    completedCommand={completedCommand}
                    setSkillStates={setSkillStates}
                    setInvokeSkills={setInvokeSkills}
                    setScore={setScore}
                />
            </div>
        </BasePage>
    )
}

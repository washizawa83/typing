'use client'
import { HighScoreHeader } from '@/app/_components/high-score/HighScoreHeader'
import { MainHighScoreArea } from '@/app/_components/high-score/main-area/MainHighScoreArea'
import { SkillList } from '@/app/_components/high-score/skill/SkillList'
import { SuggestCommand } from '@/app/_components/high-score/suggest/SuggestCommand'
import { BasePage } from '@/app/_components/layouts/BasePage'
import { BaseJob } from '@/app/_game-config/jobs'
import { AttackSkill } from '@/app/_game-config/skills'
import { CommandManager } from '@/app/_service/command-manager'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Props = {
    mode: 'training' | 'performance'
    job: BaseJob
}

export interface SkillStatus {
    isAvailable: boolean
}

// const mockSkillSets: AttackSkill[] = [
//     new Heat(),
//     new OverHeat(),
//     new LimitOfHeat(),
// ]

export const HighScoreWrapComponent = ({ mode, job }: Props) => {
    const skills = Array.from(job.skills.values())
    const [entryKeys, setEntryKeys] = useState('')
    const [completedCommand, setCompletedCommand] = useState<string | null>(
        null,
    )
    const [filteredAcceptedCommands, setFilteredAcceptedCommands] = useState<
        string[]
    >(skills.map((skill) => skill.suggestName))

    const router = useRouter()
    const commandManager = new CommandManager(skills)

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
                <MainHighScoreArea mode={mode} />
                <SuggestCommand
                    filteredAcceptedCommands={filteredAcceptedCommands}
                    entryKeys={entryKeys}
                    completedCommand={completedCommand}
                    resetSuggest={handleResetSuggest}
                />
                <SkillList
                    skills={skills as AttackSkill[]}
                    completedCommand={completedCommand}
                />
            </div>
        </BasePage>
    )
}

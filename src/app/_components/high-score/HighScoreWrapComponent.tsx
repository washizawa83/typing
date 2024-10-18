'use client'
import { HighScoreHeader } from '@/app/_components/high-score/HighScoreHeader'
import { MainHighScoreArea } from '@/app/_components/high-score/main-area/MainHighScoreArea'
import { SkillList } from '@/app/_components/high-score/skill/SkillList'
import { SuggestCommand } from '@/app/_components/high-score/suggest/SuggestCommand'
import { BasePage } from '@/app/_components/layouts/BasePage'
import type { BaseJob } from '@/app/_game-config/jobs'
import type { AttackSkill } from '@/app/_game-config/skills'
import { useGameContext } from '@/app/_providers/GameProvider'
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

export const HighScoreWrapComponent = ({ mode, job }: Props) => {
    const skills = Array.from(job.skills.values())
    const [entryKeys, setEntryKeys] = useState('')
    const [completedCommand, setCompletedCommand] = useState<string | null>(
        null,
    )
    const [filteredAcceptedCommands, setFilteredAcceptedCommands] = useState<
        string[]
    >(skills.map((skill) => skill.suggestName))
    const { incrementTypeCount, isTimeOver } = useGameContext()

    const router = useRouter()
    const commandManager = new CommandManager(skills)

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (isTimeOver) return
            if (event.shiftKey && event.location === 1) return
            if (event.key === 'Escape') return router.push('/pages/home/')

            commandManager.addEntryKeys(event.key)
            setFilteredAcceptedCommands(commandManager.searchAcceptedCommands())
            setEntryKeys(commandManager.getEntryKeys())
            incrementTypeCount()

            if (commandManager.getCompletedCommand()) {
                setCompletedCommand(commandManager.getCompletedCommand())
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [isTimeOver])

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

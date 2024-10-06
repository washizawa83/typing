'use client'
import { HighScoreHeader } from '@/app/_components/high-score/HighScoreHeader'
import { SkillList } from '@/app/_components/high-score/SkillList'
import { SuggestCommand } from '@/app/_components/high-score/SuggestCommand'
import { BasePage } from '@/app/_components/layouts/BasePage'
import { CommandManager } from '@/app/_service/command-manager'
import type { BaseSkill } from '@/app/_service/skill'
import { Heat, LimitOfHeat, OverHeat } from '@/app/_service/skill'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Props = {
    mode: 'training' | 'performance'
}

const mockSkillSets: BaseSkill[] = [
    new Heat(),
    new OverHeat(),
    new LimitOfHeat(),
]

const mockCommands = ['heat', 'over heat', 'limit of heat']

export const HighScorePageComponent = ({ mode }: Props) => {
    const [entryKeys, setEntryKeys] = useState('')
    const [filteredAcceptedCommands, setFilteredAcceptedCommands] = useState<
        string[]
    >(mockSkillSets.map((skill) => skill.name))
    const router = useRouter()

    const commandManager = new CommandManager(mockSkillSets)

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.shiftKey && event.location === 1) return
            if (event.key === 'Escape') return router.push('/pages/home/')

            commandManager.setEntryKeys(event.key)
            setFilteredAcceptedCommands(commandManager.searchAcceptedCommands())
            setEntryKeys(commandManager.getEntryKeys())
            commandManager.getCompletedCommand()
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    return (
        <BasePage>
            <div>
                <HighScoreHeader mode={mode} />
                <div className="h-72"></div>
                <SuggestCommand
                    filteredAcceptedCommands={filteredAcceptedCommands}
                    entryKeys={entryKeys}
                />
                <SkillList skills={mockSkillSets} />
            </div>
        </BasePage>
    )
}

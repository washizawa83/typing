'use client'
import { HighScoreHeader } from '@/app/_components/high-score/HighScoreHeader'
import { SuggestCommand } from '@/app/_components/high-score/SuggestCommand'
import { BasePage } from '@/app/_components/layouts/BasePage'
import { CommandManager } from '@/app/_service/command-manager'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Props = {
    mode: 'training' | 'performance'
}

const mockCommands = ['heat', 'over heat', 'limit of heat']

export const HighScorePageComponent = ({ mode }: Props) => {
    const [entryKeys, setEntryKeys] = useState('')
    const [filteredAcceptedCommands, setFilteredAcceptedCommands] =
        useState<string[]>(mockCommands)
    const router = useRouter()

    const commandManager = new CommandManager(mockCommands)

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
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
    }, [commandManager])

    return (
        <BasePage>
            <div>
                <HighScoreHeader mode={mode} />
                <div className="h-96"></div>
                <SuggestCommand
                    filteredAcceptedCommands={filteredAcceptedCommands}
                    entryKeys={entryKeys}
                />
            </div>
        </BasePage>
    )
}

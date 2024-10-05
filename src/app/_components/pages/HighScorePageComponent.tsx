'use client'
import { BasePage } from '@/app/_components/layouts/BasePage'
import { CommandManager } from '@/app/_service/command'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { RiArrowGoBackFill } from 'react-icons/ri'

type Props = {
    mode: 'training' | 'performance'
}

export const HighScorePageComponent = ({ mode }: Props) => {
    const [filteredAcceptedCommands, setFilteredAcceptedCommands] = useState<
        string[]
    >([])
    const router = useRouter()

    const commandManager = new CommandManager([
        'hige',
        'hoge1',
        'hoge2',
        'hoge3',
        'hoge12',
        'hoge22',
    ])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') return router.push('/pages/home/')
            commandManager.setEntryKeys(event.key)
            setFilteredAcceptedCommands(commandManager.searchAcceptedCommands())
            console.log(commandManager.getCompletedCommand())
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    return (
        <BasePage>
            <div>
                <header className="flex items-center justify-between leading-8">
                    <div className="flex cursor-pointer items-center">
                        <RiArrowGoBackFill />
                        <span className="ml-3 text-sm">Esc</span>
                    </div>
                    <div>{mode}</div>
                </header>
                <ul>
                    {filteredAcceptedCommands.map((command) => (
                        <li key={command}>{command}</li>
                    ))}
                </ul>
            </div>
        </BasePage>
    )
}

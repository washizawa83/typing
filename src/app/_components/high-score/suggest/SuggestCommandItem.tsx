import type { SkillStatus } from '@/app/_components/pages/HighScorePageComponent'
import { useEffect, useState } from 'react'

type Props = {
    commandName: string
    entryKeys: string
    isCompleted: boolean
    resetSuggest: () => void
    skillStates: Record<string, SkillStatus>
}

export const SuggestCommandItem = ({
    commandName,
    entryKeys,
    isCompleted,
    resetSuggest,
    skillStates,
}: Props) => {
    const [enteredKeys, setEnteredKeys] = useState('')
    const [unEnteredKeys, setUnEnteredKeys] = useState('')

    useEffect(() => {
        const splitEntryKeys = () => {
            const splitCommandName = commandName.split('')
            const splitEntryKeys = entryKeys.split('')
            const enteredIndex = [...Array(commandName.length)].filter(
                (_, index) => splitCommandName[index] === splitEntryKeys[index],
            ).length
            return [
                commandName.slice(0, enteredIndex),
                commandName.slice(enteredIndex),
            ]
        }

        const splitEntryKeyResult = splitEntryKeys()
        setEnteredKeys(splitEntryKeyResult[0])
        setUnEnteredKeys(splitEntryKeyResult[1])

        if (isCompleted) {
            resetSuggest()
        }
    }, [entryKeys, commandName])

    return (
        <li className="w-1/4">
            <span className="text-amber-600">{enteredKeys}</span>
            <span
                className={`${!skillStates[commandName]?.isAvailable && 'text-gray-700'}`}
            >
                {unEnteredKeys}
            </span>
        </li>
    )
}

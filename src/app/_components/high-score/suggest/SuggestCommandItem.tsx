import { useGameContext } from '@/app/_providers/GameProvider'
import { useEffect, useState } from 'react'

type Props = {
    commandName: string
    entryKeys: string
    isCompleted: boolean
    resetSuggest: () => void
}

const toCamelCase = (value: string) => {
    return value.toLowerCase().replace(/_([a-z])/g, (_, p1) => p1.toUpperCase())
}

export const SuggestCommandItem = ({
    commandName,
    entryKeys,
    isCompleted,
    resetSuggest,
}: Props) => {
    const { skillStates } = useGameContext()
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
            <span className="text-amber-500">{enteredKeys}</span>
            <span
                className={`${!skillStates[toCamelCase(commandName)]?.isAvailable && 'text-gray-700'}`}
            >
                {unEnteredKeys}
            </span>
        </li>
    )
}

import { SuggestCommandItem } from '@/app/_components/high-score/suggest/SuggestCommandItem'

type Props = {
    filteredAcceptedCommands: string[]
    entryKeys: string
    completedCommand: string | null
    resetSuggest: () => void
}

export const SuggestCommand = ({
    filteredAcceptedCommands,
    entryKeys,
    completedCommand,
    resetSuggest,
}: Props) => {
    return (
        <div>
            <h3 className="mb-3 border-b border-richPurple pb-1">Suggest</h3>
            <ul className="flex max-h-20 min-h-20 max-w-7xl flex-wrap overflow-y-auto overflow-x-hidden">
                {filteredAcceptedCommands.map((command) => (
                    <SuggestCommandItem
                        key={command}
                        commandName={command}
                        entryKeys={entryKeys}
                        isCompleted={command === completedCommand}
                        resetSuggest={resetSuggest}
                    />
                ))}
            </ul>
        </div>
    )
}

import { SuggestCommandItem } from '@/app/_components/high-score/SuggestCommandItem'

type Props = {
    filteredAcceptedCommands: string[]
    entryKeys: string
}

export const SuggestCommand = ({
    filteredAcceptedCommands,
    entryKeys,
}: Props) => {
    return (
        <div>
            <h3 className="mb-3 border-b border-[#671f92] pb-1">Suggest</h3>
            <ul className="flex max-h-20 min-h-20 max-w-7xl flex-wrap overflow-y-auto overflow-x-hidden">
                {filteredAcceptedCommands.map((command) => (
                    <SuggestCommandItem
                        key={command}
                        commandName={command}
                        entryKeys={entryKeys}
                    />
                ))}
            </ul>
        </div>
    )
}

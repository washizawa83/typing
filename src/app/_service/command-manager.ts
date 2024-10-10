import type { BaseSkill } from '@/app/_game-config/skills'

export class CommandManager {
    private entryKeys = ''
    private acceptedCommands
    private filteredAcceptedCommands

    constructor(private skills: BaseSkill[]) {
        this.acceptedCommands = this.skills.map((skill) => skill.name)
        this.filteredAcceptedCommands = this.acceptedCommands
    }

    getEntryKeys() {
        return this.entryKeys
    }

    addEntryKeys(key: string) {
        if (key === ' ') key = '_'
        this.entryKeys = (this.entryKeys + key).toLowerCase()
    }

    resetEntryKeys() {
        this.entryKeys = ''
    }

    getFilteredAcceptedCommand() {
        return this.filteredAcceptedCommands
    }

    getAcceptedCommands() {
        return this.acceptedCommands
    }

    filterAcceptedCommands() {
        return this.filteredAcceptedCommands.filter((acceptedCommand) =>
            acceptedCommand.startsWith(this.entryKeys),
        )
    }

    updateFilteredAcceptCommands() {
        const filteredAcceptedCommandResults = this.filterAcceptedCommands()

        if (filteredAcceptedCommandResults.length > 0) {
            this.filteredAcceptedCommands = filteredAcceptedCommandResults
            return true
        }
        this.filteredAcceptedCommands = this.acceptedCommands
        return false
    }

    resetFilteredAcceptedCommands() {
        this.filteredAcceptedCommands = this.acceptedCommands
    }

    searchAcceptedCommands() {
        if (this.updateFilteredAcceptCommands())
            return this.filteredAcceptedCommands
        this.entryKeys = this.entryKeys.charAt(this.entryKeys.length - 1)
        if (this.updateFilteredAcceptCommands())
            return this.filteredAcceptedCommands
        this.entryKeys = ''
        return this.filteredAcceptedCommands
    }

    getCompletedCommand() {
        if (this.entryKeys === this.filteredAcceptedCommands[0])
            return this.filteredAcceptedCommands[0]
        return null
    }
}

import type { BaseSkill } from '@/app/_game-config/skills'
import {
    Cold,
    Heat,
    LimitOfCold,
    LimitOfHeat,
    OverCold,
    OverHeat,
} from '@/app/_game-config/skills'
import type {
    BlackMageHeatSkills,
    BlackMageSkillNames,
    BlackMageSkills,
    BlackMageState,
    JobStates,
    WhiteMageState,
} from '@/app/_type/job/jobs'
import { Dispatch, SetStateAction } from 'react'

export interface BaseJob {
    readonly name: string
    readonly displayName: string
    readonly description: string
    readonly skills: Map<string, BaseSkill>
    readonly initialState: JobStates
    readonly updateJobStateByInvoke: (
        invokeSkillId: string,
        setJobState: Dispatch<SetStateAction<JobStates>>,
    ) => void
}

export interface MageJob extends BaseJob {}

export class BlackMage implements MageJob {
    readonly name = 'blackMage'
    readonly displayName = 'Black Mage'
    readonly description = '魔法攻撃に特化したジョブ。'
    readonly skills = new Map<BlackMageSkillNames, BlackMageSkills>([
        ['heat', new Heat()],
        ['overHeat', new OverHeat()],
        ['limitOfHeat', new LimitOfHeat()],
        ['cold', new Cold()],
        ['overCold', new OverCold()],
        ['limitOfCold', new LimitOfCold()],
    ])
    static readonly maximumHeatLevel = 3
    static readonly maximumHeatLevelByLimitBreak = 8
    readonly initialState: BlackMageState = {
        heat: {
            heatLevel: 0,
            heatLevelDuration: 10,
            isLimitBreak: false,
        },
        cold: {
            coldLevel: 0,
            coldLevelDuration: 10,
            isLimitBreak: false,
        },
    }

    static isBlackMageState(state: JobStates): state is BlackMageState {
        return 'heat' in state || 'cold' in state
    }

    updateHeatLevel(currentJobState: BlackMageState, skill: Heat) {
        const addHeatLevel =
            currentJobState.heat.heatLevel + skill.risingHeatLevel
        const validatedHeatLevel =
            addHeatLevel > BlackMage.maximumHeatLevelByLimitBreak
                ? BlackMage.maximumHeatLevelByLimitBreak
                : !this.updateIsLimitBreak(currentJobState, skill) &&
                    addHeatLevel > BlackMage.maximumHeatLevel
                  ? BlackMage.maximumHeatLevel
                  : addHeatLevel
        return validatedHeatLevel
    }

    updateIsLimitBreak(currentJobState: BlackMageState, skill: Heat) {
        return skill.isLimitBreak
            ? skill.isLimitBreak
            : currentJobState.heat.isLimitBreak
    }

    setJobStateByInvoke(currentJobState: JobStates, skill: BlackMageSkills) {
        if (!BlackMage.isBlackMageState(currentJobState))
            return this.initialState

        return {
            ...currentJobState,
            [skill.type]: {
                ...currentJobState.heat,
                heatLevel: this.updateHeatLevel(
                    currentJobState,
                    skill as BlackMageHeatSkills,
                ),
                isLimitBreak: this.updateIsLimitBreak(
                    currentJobState,
                    skill as BlackMageHeatSkills,
                ),
            },
        }
    }

    updateJobStateByInvoke(
        invokeSkillId: string,
        setJobState: Dispatch<SetStateAction<JobStates>>,
    ) {
        const skill = this.skills.get(invokeSkillId as BlackMageSkillNames)
        if (!skill) return

        switch (skill.type) {
            case 'heat':
                setJobState((currentJobState) => {
                    if (!BlackMage.isBlackMageState(currentJobState))
                        return this.initialState

                    return {
                        ...currentJobState,
                        heat: {
                            ...currentJobState.heat,
                            heatLevel: this.updateHeatLevel(
                                currentJobState,
                                skill as BlackMageHeatSkills,
                            ),
                            isLimitBreak: this.updateIsLimitBreak(
                                currentJobState,
                                skill as BlackMageHeatSkills,
                            ),
                        },
                    }
                })
            case 'cold':
                setJobState((currentJobState) => {
                    if (!BlackMage.isBlackMageState(currentJobState))
                        return this.initialState

                    return {
                        ...currentJobState,
                        heat: {
                            ...currentJobState.heat,
                            heatLevel: this.updateHeatLevel(
                                currentJobState,
                                skill as BlackMageHeatSkills,
                            ),
                            isLimitBreak: this.updateIsLimitBreak(
                                currentJobState,
                                skill as BlackMageHeatSkills,
                            ),
                        },
                    }
                })
            default:
                return this.initialState
        }
    }

    updateJobStateByDuration(
        skillType: 'heat',
        setJobState: Dispatch<SetStateAction<JobStates>>,
    ) {
        switch (skillType) {
            case 'heat':
                setJobState((currentJobState) => {
                    if (!BlackMage.isBlackMageState(currentJobState))
                        return currentJobState
                    return {
                        ...currentJobState,
                        heat: {
                            ...currentJobState.heat,
                            heatLevel: currentJobState.heat.heatLevel - 1,
                        },
                    }
                })
            default:
                return
        }
    }
}

export class WhiteMage implements MageJob {
    name = 'WhiteMage'
    displayName = 'Wite Mage'
    description = '回復魔法に特化したジョブ'
    skills = new Map()
    initialState: WhiteMageState = {
        heal: {
            healLevel: 0,
            healLevelDuration: 10,
            isLimitBreak: false,
        },
    }

    updateJobStateByInvoke(
        invokeSkillId: string,
        setJobState: Dispatch<SetStateAction<JobStates>>,
    ) {
        setJobState(this.initialState)
    }

    updateLimitBreakTime(setLimitBreakTime: Dispatch<SetStateAction<number>>) {}
}

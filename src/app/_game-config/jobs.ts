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
    BlackMageSkillNames,
    BlackMageSkills,
    BlackMageState,
    JobStates,
    WhiteMageState,
} from '@/app/_type/job/jobs'
import type { Dispatch, SetStateAction } from 'react'

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
    static readonly maxTypeLevel = 3
    static readonly maxTypeLevelByLimitBreak = 6
    readonly initialState: BlackMageState = {
        heat: {
            level: 0,
            duration: 10,
            isLimitBreak: false,
        },
        cold: {
            level: 0,
            duration: 10,
            isLimitBreak: false,
        },
    }

    static isBlackMageState(state: JobStates): state is BlackMageState {
        return 'heat' in state || 'cold' in state
    }

    updateTypeLevel(currentJobState: BlackMageState, skill: BlackMageSkills) {
        const addLevel = currentJobState[skill.type].level + skill.risingLevel
        const validatedLevel =
            addLevel > BlackMage.maxTypeLevelByLimitBreak
                ? BlackMage.maxTypeLevelByLimitBreak
                : !this.updateIsLimitBreak(currentJobState, skill) &&
                    addLevel > BlackMage.maxTypeLevel
                  ? BlackMage.maxTypeLevel
                  : addLevel
        return validatedLevel
    }

    updateIsLimitBreak(
        currentJobState: BlackMageState,
        skill: BlackMageSkills,
    ) {
        return skill.isLimitBreak
            ? skill.isLimitBreak
            : currentJobState[skill.type].isLimitBreak
    }

    setJobStateByInvoke(currentJobState: JobStates, skill: BlackMageSkills) {
        if (!BlackMage.isBlackMageState(currentJobState))
            return this.initialState

        return {
            ...currentJobState,
            [skill.type]: {
                ...currentJobState[skill.type],
                level: this.updateTypeLevel(currentJobState, skill),
                isLimitBreak: this.updateIsLimitBreak(currentJobState, skill),
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
            case 'cold':
                setJobState((currentJobState) => {
                    return this.setJobStateByInvoke(currentJobState, skill)
                })
            default:
                return this.initialState
        }
    }

    updateJobStateByDuration(
        skillType: 'heat' | 'cold',
        setJobState: Dispatch<SetStateAction<JobStates>>,
    ) {
        switch (skillType) {
            case 'heat':
            case 'cold':
                setJobState((currentJobState) => {
                    if (!BlackMage.isBlackMageState(currentJobState))
                        return currentJobState
                    return {
                        ...currentJobState,
                        [skillType]: {
                            ...currentJobState[skillType],
                            level: currentJobState[skillType].level - 1,
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

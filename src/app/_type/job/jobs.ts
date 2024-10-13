import {
    Cold,
    Heat,
    LimitOfCold,
    LimitOfHeat,
    OverCold,
    OverHeat,
} from '@/app/_game-config/skills'

export type JobStates = BlackMageState | WhiteMageState

export type BlackMageState = {
    heat: {
        heatLevel: number
        heatLevelDuration: number
        isLimitBreak: boolean
    }
    cold: {
        coldLevel: number
        coldLevelDuration: number
        isLimitBreak: boolean
    }
}

export type BlackMageHeatSkillNames = 'heat' | 'overHeat' | 'limitOfHeat'
export type BlackMageColdSkillNames = 'cold' | 'overCold' | 'limitOfCold'
export type BlackMageHeatSkills = Heat | OverHeat | LimitOfHeat
export type BlackMageColdSkills = Cold | OverCold | LimitOfCold

export type BlackMageSkillNames =
    | BlackMageHeatSkillNames
    | BlackMageColdSkillNames

export type BlackMageSkills = BlackMageHeatSkills | BlackMageColdSkills

export type WhiteMageState = {
    heal: {
        healLevel: number
        healLevelDuration: number
        isLimitBreak: boolean
    }
}

export interface BaseSkill {
    readonly id: string
    readonly suggestName: string
    readonly displayName: string
    readonly description: string
    readonly iconUrl: string
    readonly reCastTimeForSeconds: number
}

export interface AttackSkill extends BaseSkill {
    readonly physicalAttack: number
    readonly magicalAttack: number
    readonly type: string
    readonly isLimitBreak: boolean
}

export interface BlackMageHeatSkill extends AttackSkill {
    readonly type: 'heat'
    readonly risingLevel: number
}

export interface BlackMageColdSkill extends AttackSkill {
    readonly type: 'cold'
    readonly risingLevel: number
}

export class Heat implements BlackMageHeatSkill {
    risingLevel = 1
    isLimitBreak = false

    type = 'heat' as const
    id = 'heat'
    suggestName = 'heat'
    displayName = 'heat'
    description = `対象に熱ダメージを与える。自身の熱レベルが${this.risingLevel}上昇する。`
    iconUrl = '/skill-icons/heat.png'
    magicalAttack = 200
    physicalAttack = 0
    reCastTimeForSeconds = 10
}

export class OverHeat implements BlackMageHeatSkill {
    risingLevel = 2
    isLimitBreak = false

    type = 'heat' as const
    id = 'overHeat'
    suggestName = 'over_heat'
    displayName = 'over heat'
    description = `対象に熱ダメージを与える。自身の熱レベルが${this.risingLevel}上昇する。`
    iconUrl = '/skill-icons/over-heat.png'
    magicalAttack = 500
    physicalAttack = 0
    reCastTimeForSeconds = 20
}

export class LimitOfHeat implements BlackMageHeatSkill {
    risingLevel = 1
    limitBreakTimeSeconds = 20
    isLimitBreak = true

    type = 'heat' as const
    id = 'limitOfHeat'
    suggestName = 'limit_of_heat'
    displayName = 'limit of heat'
    description = `対象に熱ダメージを与える。自身の熱レベルが${this.risingLevel}上昇する。さらに発動から${this.limitBreakTimeSeconds}秒間、熱レベルの限界値を超えることができる。`
    iconUrl = '/skill-icons/limit-of-heat.png'
    magicalAttack = 800
    physicalAttack = 0
    reCastTimeForSeconds = 30
}

export class Cold implements BlackMageColdSkill {
    risingLevel = 1
    isLimitBreak = false

    type = 'cold' as const
    id = 'cold'
    suggestName = 'cold'
    displayName = 'cold'
    description = `対象に冷気ダメージを与える。自身の冷気レベルが${this.risingLevel}上昇する。`
    iconUrl = '/skill-icons/cold.png'
    magicalAttack = 200
    physicalAttack = 0
    reCastTimeForSeconds = 10
}

export class OverCold implements BlackMageColdSkill {
    risingLevel = 2
    isLimitBreak = false

    type = 'cold' as const
    id = 'overCold'
    suggestName = 'over_cold'
    displayName = 'over cold'
    description = `対象に冷気ダメージを与える。自身の冷気レベルが${this.risingLevel}上昇する。`
    iconUrl = '/skill-icons/over-cold.png'
    magicalAttack = 500
    physicalAttack = 0
    reCastTimeForSeconds = 20
}

export class LimitOfCold implements BlackMageColdSkill {
    risingLevel = 1
    limitBreakTimeSeconds = 20
    isLimitBreak = true

    type = 'cold' as const
    id = 'limitOfCold'
    suggestName = 'limit_of_cold'
    displayName = 'limit of cold'
    description = `対象に冷気ダメージを与える。自身の冷気レベルが${this.risingLevel}上昇する。さらに発動から${this.limitBreakTimeSeconds}秒間、冷気レベルの限界値を超えることができる。`
    iconUrl = '/skill-icons/limit-of-cold.png'
    magicalAttack = 800
    physicalAttack = 0
    reCastTimeForSeconds = 30
}

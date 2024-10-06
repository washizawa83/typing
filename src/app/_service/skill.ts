export interface BaseSkill {
    readonly name: string
    readonly description: string
    readonly iconUrl: string
    readonly reCastTimeForSeconds: number
}

interface AttackSkill extends BaseSkill {
    readonly physicalAttack: number
    readonly magicalAttack: number
}

export class Heat implements AttackSkill {
    risingHeatLevel = 1

    name = 'heat'
    description = `対象に熱ダメージを与える。エリアの熱レベルが${this.risingHeatLevel}上昇する。`
    iconUrl = '/skill-icons/heat.png'
    magicalAttack = 200
    physicalAttack = 0
    reCastTimeForSeconds = 10
}

export class OverHeat implements AttackSkill {
    risingHeatLevel = 2

    name = 'over_heat'
    description = `対象に熱ダメージを与える。エリアの熱レベルが${this.risingHeatLevel}上昇する。`
    iconUrl = '/skill-icons/over-heat.png'
    magicalAttack = 500
    physicalAttack = 0
    reCastTimeForSeconds = 20
}

export class LimitOfHeat implements AttackSkill {
    risingHeatLevel = 1
    uniqueEffectTimeForSeconds = 20

    name = 'limit_of_heat'
    description = `対象に熱ダメージを与える。エリアの熱レベルが${this.risingHeatLevel}上昇する。さらに発動から${this.uniqueEffectTimeForSeconds}秒間熱レベルの限界値を超えることができる。`
    iconUrl = '/skill-icons/limit-of-heat.png'
    magicalAttack = 800
    physicalAttack = 0
    reCastTimeForSeconds = 30
}

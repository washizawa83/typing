import type { BaseSkill } from '@/app/_game-config/skills'
import { Heat, LimitOfHeat, OverHeat } from '@/app/_game-config/skills'
import type { BlackMageState } from '@/app/_type/job/jobs'

export interface BaseJob {
    readonly name: string
    readonly displayName: string
    readonly description: string
    readonly skills: BaseSkill[]
}

export interface MageJob extends BaseJob {}

export class BackMage implements MageJob {
    name = 'blackMage'
    displayName = 'Black Mage'
    description = '魔法攻撃に特化したジョブ。'
    skills = [new Heat(), new OverHeat(), new LimitOfHeat()]
    state: BlackMageState

    constructor(state: BlackMageState) {
        this.state = state
    }
}

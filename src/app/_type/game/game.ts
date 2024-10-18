import type { BaseSkill } from '@/app/_game-config/skills'

export type GameResult = {
    typeCount: number
    invokeSkills: BaseSkill[]
}

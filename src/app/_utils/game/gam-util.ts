import type { BaseSkill } from '@/app/_game-config/skills'

export const getSkillCommandLength = (skill: BaseSkill) => {
    return skill.suggestName.length
}

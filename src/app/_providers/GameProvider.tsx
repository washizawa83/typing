'use client'
import { BaseJob } from '@/app/_game-config/jobs'
import { AttackSkill, BaseSkill } from '@/app/_game-config/skills'
import { JobStates } from '@/app/_type/job/jobs'
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
} from 'react'

type SkillStatus = {
    isAvailable: boolean
}

type Props = {
    children: ReactNode
    job: BaseJob
}

type GameContextProps = {
    score: number
    setScore: Dispatch<SetStateAction<number>>
    jobState: JobStates
    setJobState: Dispatch<SetStateAction<JobStates>>
    skillStates: Record<string, SkillStatus>
    setSkillStates: Dispatch<SetStateAction<Record<string, SkillStatus>>>
    updateSkillStateIsAvailable: (
        skillName: string,
        isAvailable: boolean,
    ) => void
    invokedSkillLogs: BaseSkill[]
    setInvokedSkillLogs: Dispatch<SetStateAction<BaseSkill[]>>
    invokeSkill: (skill: AttackSkill) => void
}

export const useGameContext = () => {
    return useContext(GameContext)
}

const GameContext = createContext<GameContextProps>({
    score: 0,
    setScore: () => {},
    jobState: {} as JobStates,
    setJobState: () => {},
    skillStates: {},
    setSkillStates: () => {},
    updateSkillStateIsAvailable: () => {},
    invokedSkillLogs: [],
    setInvokedSkillLogs: () => {},
    invokeSkill: () => {},
})

const createSkillMap = (job: BaseJob) => {
    return Array.from(job.skills.values()).reduce<Record<string, SkillStatus>>(
        (acc, skill) => {
            acc[skill.id] = { isAvailable: true }
            return acc
        },
        {},
    )
}

export const GameProvider = ({ children, job }: Props) => {
    const [jobState, setJobState] = useState<JobStates>(job.initialState)
    const [skillStates, setSkillStates] = useState(createSkillMap(job))
    const [invokedSkillLogs, setInvokedSkillLogs] = useState<BaseSkill[]>([])
    const [score, setScore] = useState(0)

    const invokeSkill = (skill: AttackSkill) => {
        setInvokedSkillLogs((invokeSkills) => [...invokeSkills, skill])
        setScore((score) => score + skill.magicalAttack)
        updateSkillStateIsAvailable(skill.id, false)
        job.updateJobStateByInvoke(skill.id, setJobState)
    }

    const updateSkillStateIsAvailable = (
        skillName: string,
        isAvailable: boolean,
    ) => {
        setSkillStates((prevSkillStates) => ({
            ...prevSkillStates,
            [skillName]: { isAvailable },
        }))
    }

    return (
        <GameContext.Provider
            value={{
                score,
                setScore,
                jobState,
                setJobState,
                skillStates,
                setSkillStates,
                updateSkillStateIsAvailable,
                invokedSkillLogs,
                setInvokedSkillLogs,
                invokeSkill,
            }}
        >
            {children}
        </GameContext.Provider>
    )
}

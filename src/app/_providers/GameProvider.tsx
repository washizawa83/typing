'use client'
import type { BaseJob } from '@/app/_game-config/jobs'
import type { AttackSkill, BaseSkill } from '@/app/_game-config/skills'
import type { GameResult } from '@/app/_type/game/game'
import type { JobStates } from '@/app/_type/job/jobs'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext, useContext, useState } from 'react'

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
    isTimeOver: boolean
    setIsTimeOver: Dispatch<SetStateAction<boolean>>
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
    incrementTypeCount: () => void
    addInvokeSkills: (invokeSkill: BaseSkill) => void
    gameResult: GameResult
}

export const useGameContext = () => {
    return useContext(GameContext)
}

const GameContext = createContext<GameContextProps>({
    score: 0,
    setScore: () => {},
    isTimeOver: false,
    setIsTimeOver: () => {},
    jobState: {} as JobStates,
    setJobState: () => {},
    skillStates: {},
    setSkillStates: () => {},
    updateSkillStateIsAvailable: () => {},
    invokedSkillLogs: [],
    setInvokedSkillLogs: () => {},
    invokeSkill: () => {},
    incrementTypeCount: () => {},
    addInvokeSkills: () => {},
    gameResult: {} as GameResult,
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
    const [gameResult, setGameResult] = useState<GameResult>({
        typeCount: 0,
        invokeSkills: [],
    })
    const [jobState, setJobState] = useState<JobStates>(job.initialState)
    const [skillStates, setSkillStates] = useState(createSkillMap(job))
    const [invokedSkillLogs, setInvokedSkillLogs] = useState<BaseSkill[]>([])
    const [score, setScore] = useState(0)
    const [isTimeOver, setIsTimeOver] = useState(false)

    const incrementTypeCount = () => {
        setGameResult((currentGameResult) => ({
            ...currentGameResult,
            typeCount: ++currentGameResult.typeCount,
        }))
    }

    const addInvokeSkills = (invokeSkill: BaseSkill) => {
        setGameResult((currentGameResult) => ({
            ...currentGameResult,
            invokeSkills: [...currentGameResult.invokeSkills, invokeSkill],
        }))
    }

    const invokeSkill = (skill: AttackSkill) => {
        setInvokedSkillLogs((invokeSkills) => [...invokeSkills, skill])
        addInvokeSkills(skill)
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
                isTimeOver,
                setIsTimeOver,
                jobState,
                setJobState,
                skillStates,
                setSkillStates,
                updateSkillStateIsAvailable,
                invokedSkillLogs,
                setInvokedSkillLogs,
                invokeSkill,
                incrementTypeCount,
                addInvokeSkills,
                gameResult,
            }}
        >
            {children}
        </GameContext.Provider>
    )
}

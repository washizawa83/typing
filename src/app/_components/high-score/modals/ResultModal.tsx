import { InvokeSkillList } from '@/app/_components/high-score/modals/InvokeSkillList'
import { ResultDetailCard } from '@/app/_components/high-score/modals/ResultDetailCard'
import { highScoreTimeLimit } from '@/app/_game-config/game'
import { useGameContext } from '@/app/_providers/GameProvider'
import { getUser } from '@/app/_service/database-service'
import { getSkillCommandLength } from '@/app/_utils/game/gam-util'
import { createClient } from '@/app/_utils/supabase/client'
import type { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import { CgArrowLeft } from 'react-icons/cg'
import { FaRankingStar } from 'react-icons/fa6'

type resultViewModel = {
    score: number
    dps: number
    commandHitRate: number
    previousHighScore?: number
    previousRankingScore?: number
    currentRankingScore?: number
}

type HighScore = {
    id: string
    job_id: string
    score: number
    user_id: string
    user_name: string
    created_at: string
}

export const ResultModal = () => {
    const supabase = createClient()
    const { score, gameResult, isTimeOver } = useGameContext()
    const [resultViewModel, setResultViewModel] = useState<resultViewModel>({
        score: 0,
        dps: 0,
        commandHitRate: 0,
    })
    const [user, setUser] = useState<User | null>(null)
    const [previousHighScore, setPreviousHighScore] =
        useState<HighScore | null>(null)

    const router = useRouter()

    const calcCommandHitRate = () => {
        const totalSkillCommandLength = gameResult.invokeSkills.reduce(
            (acc, curr) => acc + getSkillCommandLength(curr),
            0,
        )
        return Math.round(
            (totalSkillCommandLength / gameResult.typeCount) * 100,
        )
    }

    const getRankForScore = async (score?: number) => {
        if (!score) return null
        const { data, error } = await supabase.rpc('get_rank_for_score', {
            your_specific_score: score,
        })
        return data
    }

    const getRegisteredRankingScore = async (user: User) => {
        const { data, error } = await supabase
            .from('high_scores')
            .select('*')
            .eq('user_id', user.id)
            .limit(1)

        if (error) {
            console.error('Error fetching high scores:', error)
            return null
        }

        return data[0]
    }

    const makeResultViewModel = async () => {
        const baseResultViewModel = {
            score,
            dps: Math.round(score / highScoreTimeLimit),
            commandHitRate: calcCommandHitRate() || 0,
        }
        const user = (await getUser()).data.user
        setUser(user)
        if (!user) {
            return setResultViewModel(baseResultViewModel)
        }

        const previousHighScore = await getRegisteredRankingScore(user)
        setPreviousHighScore(previousHighScore)
        const currentRankingScore = await getRankForScore(score)
        const previousRankingScore = await getRankForScore(
            previousHighScore?.score,
        )

        return setResultViewModel({
            ...baseResultViewModel,
            previousHighScore: previousHighScore?.score ?? undefined,
            previousRankingScore: previousRankingScore ?? undefined,
            currentRankingScore: currentRankingScore ?? undefined,
        })
    }

    const setRanking = async () => {
        if (!user || !previousHighScore) return
        await supabase.from('high_scores').upsert({
            id: previousHighScore.id,
            user_id: user.id,
            user_name: 'テストユーザー',
            score,
            job_id: 'f019c525-645c-47df-87db-bd22a985fd37',
        })
    }

    useEffect(() => {
        if (isTimeOver) {
            makeResultViewModel()
        }
    }, [isTimeOver])

    return (
        isTimeOver && (
            <div className="absolute left-0 top-0 z-30 flex size-full items-center justify-center bg-[#111111b0]">
                <div className="z-40 flex h-[48rem] w-5/6 flex-col rounded bg-[#29292a] px-16">
                    <header className="mb-5 flex justify-center p-5">
                        <h1 className="text-2xl">Result</h1>
                    </header>
                    <div className="mb-10 flex items-center justify-between">
                        <ResultDetailCard
                            label="スコア"
                            value={resultViewModel.score}
                        />
                        <ResultDetailCard
                            label="DPS"
                            value={resultViewModel.dps}
                        />
                        <ResultDetailCard
                            label="有効打率"
                            value={`${resultViewModel.commandHitRate}%`}
                        />
                    </div>
                    <div className="mb-10 flex flex-col items-center justify-between p-2">
                        <h2 className="mb-5 text-xl">Ranking</h2>
                        <div className="flex w-full items-center justify-between">
                            <div className="w-52 text-center">
                                <h3 className="text-xl">
                                    {resultViewModel.currentRankingScore ?? '-'}
                                    位
                                </h3>
                                <span>
                                    前回：
                                    {resultViewModel.previousRankingScore ??
                                        '-'}
                                    位
                                </span>
                            </div>
                            <div className="w-52 text-center">
                                <h3 className="text-xl">
                                    {resultViewModel.score}
                                </h3>
                                <span>
                                    前回：
                                    {resultViewModel.previousHighScore ?? '-'}
                                </span>
                            </div>
                            {user ? (
                                <button
                                    className="flex w-52 items-center justify-center rounded border border-lightBrown p-2"
                                    onClick={() => setRanking()}
                                >
                                    <span className="mr-3">ランキング登録</span>
                                    <div>
                                        <IconContext.Provider
                                            value={{
                                                size: '32px',
                                                color: '#e2d249',
                                            }}
                                        >
                                            <FaRankingStar />
                                        </IconContext.Provider>
                                    </div>
                                </button>
                            ) : (
                                <h3 className="text-sm">
                                    ログインするとランキングに登録できます
                                </h3>
                            )}
                        </div>
                    </div>
                    <InvokeSkillList invokeSkills={gameResult.invokeSkills} />
                    <div className="mt-5 flex items-center justify-center px-10">
                        <button
                            className="flex items-center p-2"
                            onClick={() => router.push('/pages/home/')}
                        >
                            <CgArrowLeft />
                            Top
                        </button>
                    </div>
                </div>
            </div>
        )
    )
}

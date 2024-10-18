'use client'
import { HighScoreWrapComponent } from '@/app/_components/high-score/HighScoreWrapComponent'
import { ResultModal } from '@/app/_components/high-score/modals/ResultModal'
import { BlackMage } from '@/app/_game-config/jobs'
import { GameProvider } from '@/app/_providers/GameProvider'

type Props = {
    mode: 'training' | 'performance'
}

export const HighScorePageComponent = ({ mode }: Props) => {
    const selectedJob = new BlackMage()

    return (
        <GameProvider job={selectedJob}>
            <HighScoreWrapComponent mode={mode} job={selectedJob} />
            <ResultModal />
        </GameProvider>
    )
}

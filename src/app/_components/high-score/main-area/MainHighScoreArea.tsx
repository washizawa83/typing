import { MainAreaHeader } from '@/app/_components/high-score/main-area/header/MainAreaHeader'
import { InvokeSkillStack } from '@/app/_components/high-score/main-area/InvokeSkillStack'
import { JobState } from '@/app/_components/high-score/main-area/job-status/JobStateWrap'
import { BlackMage } from '@/app/_game-config/jobs'

type Props = {
    mode: 'training' | 'performance'
}

export const MainHighScoreArea = ({ mode }: Props) => {
    return (
        <div className="relative h-80 w-full">
            <div className="absolute size-full">
                <MainAreaHeader mode={mode} />
                <JobState job={new BlackMage()} />
                <InvokeSkillStack />
            </div>
        </div>
    )
}

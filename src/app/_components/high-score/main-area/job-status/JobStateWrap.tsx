import { BaseJobState } from '@/app/_components/high-score/main-area/job-status/BaseJoobState'
import { BlackMageJobState } from '@/app/_components/high-score/main-area/job-status/BlackMageState'
import type { BackMage } from '@/app/_game-config/jobs'

type Props = {
    job: BackMage
}

export const JobState = ({ job }: Props) => {
    switch (job.name) {
        case 'blackMage':
            return (
                <BaseJobState>
                    <BlackMageJobState jobState={job.state} />
                </BaseJobState>
            )
        default:
            return (
                <BaseJobState>
                    <BlackMageJobState jobState={job.state} />
                </BaseJobState>
            )
    }
}

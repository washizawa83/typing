import { BaseJobState } from '@/app/_components/high-score/main-area/job-status/BaseJoobState'
import { BlackMageJobState } from '@/app/_components/high-score/main-area/job-status/black-mage/BlackMageState'
import type { BlackMage } from '@/app/_game-config/jobs'

type Props = {
    job: BlackMage
}

export const JobState = ({ job }: Props) => {
    switch (job.name) {
        case 'blackMage':
            return (
                <BaseJobState>
                    <BlackMageJobState job={job} />
                </BaseJobState>
            )
        default:
            return (
                <BaseJobState>
                    <BlackMageJobState job={job} />
                </BaseJobState>
            )
    }
}

import { Score } from '@/app/_components/high-score/main-area/header/Score'
import { Timer } from '@/app/_components/high-score/main-area/header/Timer'

type Props = {
    mode: 'training' | 'performance'
    score: number
}

export const MainAreaHeader = ({ mode, score }: Props) => {
    return (
        <div className="left-4/2 absolute top-0 h-20 w-full">
            <Score score={score} />
            <Timer mode={mode} />
        </div>
    )
}

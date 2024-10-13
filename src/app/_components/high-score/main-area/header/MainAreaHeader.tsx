import { Score } from '@/app/_components/high-score/main-area/header/Score'
import { Timer } from '@/app/_components/high-score/main-area/header/Timer'
import { useGameContext } from '@/app/_providers/GameProvider'

type Props = {
    mode: 'training' | 'performance'
}

export const MainAreaHeader = ({ mode }: Props) => {
    const { score } = useGameContext()
    return (
        <div className="left-4/2 absolute top-0 h-20 w-full">
            <Score score={score} />
            <Timer mode={mode} />
        </div>
    )
}

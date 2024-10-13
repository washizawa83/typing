import anime from 'animejs'
import { useEffect, useRef, useState } from 'react'

type Props = {
    score: number
}

export const Score = ({ score }: Props) => {
    const [displayScore, setDisplayScore] = useState(0)
    const displayScoreRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        anime({
            targets: displayScoreRef.current,
            innerHTML: [displayScore, score],
            easing: 'easeInOutExpo',
            round: 1,
            duration: 1000,
        })
        setDisplayScore(score)
    }, [score])

    return (
        <div className="absolute">
            <div className="text-3xl" ref={displayScoreRef}>
                {displayScore}
            </div>
        </div>
    )
}

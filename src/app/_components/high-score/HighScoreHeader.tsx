import { useRouter } from 'next/navigation'
import { RiArrowGoBackFill } from 'react-icons/ri'

type Props = {
    mode: 'training' | 'performance'
}

export const HighScoreHeader = ({ mode }: Props) => {
    const router = useRouter()

    return (
        <header className="flex items-center justify-between leading-8">
            <div
                onClick={() => router.push('/pages/home/')}
                className="flex cursor-pointer items-center"
            >
                <RiArrowGoBackFill />
                <span className="ml-3 text-sm">Esc</span>
            </div>
            <div>{mode}</div>
        </header>
    )
}

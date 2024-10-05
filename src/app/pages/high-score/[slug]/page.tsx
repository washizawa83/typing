import { HighScorePageComponent } from '@/app/_components/pages/HighScorePageComponent'

type Props = {
    params: { slug: 'training' | 'performance' }
}

export async function generateStaticParams() {
    const slugs = ['training', 'performance']

    return slugs.map((slug) => ({
        slug,
    }))
}

export const HighScorePage = ({ params }: Props) => {
    return <HighScorePageComponent mode={params.slug} />
}

export default HighScorePage

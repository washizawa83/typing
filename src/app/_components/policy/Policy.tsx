import { BasePage } from '@/app/_components/layouts/BasePage'

type Props = {
    title: string
    description: string
    policies: {
        title: string
        description?: string
        content: string | string[]
    }[]
}

export const Policy = ({ title, description, policies }: Props) => {
    return (
        <div className="bg-background">
            <BasePage>
                <div className="py-10">
                    <h1 className="pb-5 pt-10 text-center text-3xl">{title}</h1>
                    <p>{description}</p>
                    {policies.map((policy, i) => {
                        return (
                            <div key={i} className="py-3">
                                <h2 className="my-2 text-2xl">
                                    <span className="mr-3 border-l-8 border-richPurple"></span>
                                    {policy.title}
                                </h2>
                                {policy.description && (
                                    <p>{policy.description}</p>
                                )}
                                {Array.isArray(policy.content) ? (
                                    <ul
                                        key={i}
                                        className="list-decimal pl-10 marker:text-lg"
                                    >
                                        {policy.content.map(
                                            (contentText, i) => (
                                                <li
                                                    className="list-outside leading-8"
                                                    key={i}
                                                >
                                                    {contentText}
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                ) : (
                                    <p>{policy.content}</p>
                                )}
                            </div>
                        )
                    })}
                </div>
            </BasePage>
        </div>
    )
}

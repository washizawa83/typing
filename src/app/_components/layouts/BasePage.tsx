import type { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

export const BasePage = ({ children }: Props) => {
    return (
        <main className="h-screen w-full overflow-auto">
            <div className="m-auto h-full w-11/12">{children}</div>
        </main>
    )
}

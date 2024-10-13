import type { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

export const BaseJobState = ({ children }: Props) => {
    return <div className="absolute bottom-0 left-0">{children}</div>
}

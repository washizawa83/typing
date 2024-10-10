import type { BlackMageState } from '@/app/_type/job/jobs'
import { useState } from 'react'

type Props = {
    jobState: BlackMageState
}

export const BlackMageJobState = ({ jobState }: Props) => {
    const [state, setStatus] = useState<BlackMageState>(jobState)
    console.log(Array(state.heat.heatLevel))
    return (
        <div>
            <ul className="flex flex-wrap-reverse">
                {[...Array(8)].map((_, index) =>
                    index < 3 ? (
                        <li
                            key={index}
                            className={`h-5 w-1 ${state.heat.heatLevel >= index + 1 ? 'bg-heat' : 'bg-[#222222]'} m-2`}
                        ></li>
                    ) : (
                        state.heat.isLimitBleak && (
                            <li
                                key={index}
                                className={`h-7 w-1 ${state.heat.heatLevel >= index + 1 ? 'bg-[#4632eb]' : 'bg-[#222222]'} m-2`}
                            ></li>
                        )
                    ),
                )}
            </ul>
        </div>
    )
}

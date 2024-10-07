import type { BaseSkill } from '@/app/_service/skill'
import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'
import type { Dispatch, SetStateAction } from 'react'
import { useEffect } from 'react'

type Props = {
    skill: BaseSkill
    setInvokeSkills: Dispatch<SetStateAction<BaseSkill[]>>
}

export const InvokeSkill = ({ skill, setInvokeSkills }: Props) => {
    const controls = useAnimation()
    const skillStackMotion = async () => {
        await controls.start({
            opacity: 0,
            transition: {
                duration: 5,
                ease: 'backInOut',
            },
        })

        setInvokeSkills((invokeSkills) =>
            invokeSkills.filter((invokeSkill) => invokeSkill !== skill),
        )
    }

    useEffect(() => {
        skillStackMotion()
    }, [])

    return (
        <motion.div
            key={skill.name}
            className="mt-2 flex w-60 items-center rounded bg-[#2c2c2e] p-2"
            initial={{ opacity: 1 }}
            animate={controls}
        >
            <div className="size-9 overflow-hidden rounded-md">
                <Image
                    key={skill.name}
                    src={skill.iconUrl}
                    alt="skill logo"
                    width={36}
                    height={36}
                />
            </div>
            <div className="ml-2 text-sm">{skill.name}</div>
        </motion.div>
    )
}

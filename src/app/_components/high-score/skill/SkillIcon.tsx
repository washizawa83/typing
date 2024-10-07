import { SkillDescription } from '@/app/_components/high-score/skill/SkillDescription'
import type { SkillStatus } from '@/app/_components/pages/HighScorePageComponent'
import type { BaseSkill } from '@/app/_service/skill'
import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'
import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useState } from 'react'

type Props = {
    skill: BaseSkill
    invoke: boolean
    setSkillStates: Dispatch<SetStateAction<Record<string, SkillStatus>>>
    setInvokeSkills: Dispatch<SetStateAction<BaseSkill[]>>
}

enum ReCastPhase {
    half,
    full,
}

export const SkillIcon = ({
    skill,
    invoke,
    setSkillStates,
    setInvokeSkills,
}: Props) => {
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)
    const [isReCast, setIsReCast] = useState(false)
    const [reCastPhase, setReCastPhase] = useState<
        ReCastPhase.half | ReCastPhase.full
    >(ReCastPhase.half)

    const firstControls = useAnimation()
    const secondControls = useAnimation()

    const reCastMotionDuration = skill.reCastTimeForSeconds / 2

    const updateSkillState = (isAvailable: boolean) => {
        setSkillStates((prevSkillStates) => ({
            ...prevSkillStates,
            [skill.name]: { isAvailable },
        }))
    }

    const reCastMotionFist = async () => {
        await firstControls.start({
            rotate: -180,
            transition: {
                duration: reCastMotionDuration,
                ease: 'linear',
            },
        })
    }

    const reCastMotionSecond = async () => {
        await secondControls.start({
            rotate: -180,
            transition: {
                duration: reCastMotionDuration,
                ease: 'linear',
            },
        })

        if (reCastPhase === ReCastPhase.half)
            return setReCastPhase(ReCastPhase.full)

        setReCastPhase(ReCastPhase.half)
        setIsReCast(false)
        updateSkillState(true)
    }

    useEffect(() => {
        if (!isReCast) return

        if (reCastPhase === ReCastPhase.half) {
            reCastMotionFist()
            reCastMotionSecond()
            updateSkillState(false)
        }

        if (reCastPhase === ReCastPhase.full) {
            reCastMotionSecond()
        }
    }, [isReCast, reCastPhase])

    useEffect(() => {
        if (invoke && !isReCast) {
            setIsReCast(true)
            setInvokeSkills((invokeSkills) => [...invokeSkills, skill])
        }
    }, [invoke])

    const handleCloseDescription = () => {
        setIsDescriptionOpen(false)
    }

    return (
        <div className="relative flex size-16 flex-col items-center">
            <SkillDescription
                description={skill.description}
                isOpen={isDescriptionOpen}
                close={handleCloseDescription}
            />
            <div
                className="relative overflow-hidden rounded-md"
                style={{ width: '30px', height: '30px' }}
                onClick={() => setIsDescriptionOpen(true)}
            >
                <Image
                    key={skill.name}
                    src={skill.iconUrl}
                    alt="skill logo"
                    width={30}
                    height={30}
                />
                {isReCast && reCastPhase === ReCastPhase.half && (
                    <div>
                        <motion.div
                            className="absolute inset-0 bg-transparent"
                            style={{
                                width: '38px',
                                height: '38px',
                                top: '-4px',
                                left: '-4px',
                                zIndex: 20,
                            }}
                            initial={{ rotate: 0 }}
                            animate={firstControls}
                        >
                            <div
                                style={{
                                    width: '19px',
                                    height: '38px',
                                    borderRadius: '38px 0 0 38px',
                                    background: `conic-gradient(#8080807d 0%, #8080807d 100%)`,
                                    isolation: 'isolate',
                                }}
                            ></div>
                        </motion.div>
                        <span
                            className="absolute overflow-hidden"
                            style={{
                                width: '19px',
                                height: '38px',
                                top: '-4px',
                                right: '-4px',
                                zIndex: 15,
                            }}
                        >
                            <motion.div
                                className="absolute inset-0 flex bg-transparent"
                                style={{
                                    width: '38px',
                                    height: '38px',
                                    left: '-19px',
                                    zIndex: 10,
                                }}
                                initial={{ rotate: 0 }}
                                animate={secondControls}
                            >
                                <div
                                    style={{ width: '19px', height: '38px' }}
                                ></div>
                                <div
                                    style={{
                                        right: 0,
                                        width: '19px',
                                        height: '38px',
                                        borderRadius: '0 38px 38px 0',
                                        background: `conic-gradient(#8080807d 0%, #8080807d 100%)`,
                                    }}
                                ></div>
                            </motion.div>
                        </span>
                    </div>
                )}
                {isReCast && reCastPhase === ReCastPhase.full && (
                    <div>
                        <span
                            className="absolute overflow-hidden"
                            style={{
                                width: '19px',
                                height: '38px',
                                top: '-4px',
                                right: '-4px',
                                zIndex: 15,
                            }}
                        >
                            <motion.div
                                className="absolute inset-0 flex bg-transparent"
                                style={{
                                    width: '38px',
                                    height: '38px',
                                    left: '-19px',
                                    zIndex: 10,
                                }}
                                initial={{ rotate: 0 }}
                                animate={secondControls}
                            >
                                <div
                                    style={{ width: '19px', height: '38px' }}
                                ></div>
                                <div
                                    style={{
                                        right: 0,
                                        width: '19px',
                                        height: '38px',
                                        borderRadius: '0 38px 38px 0',
                                        background: `conic-gradient(#8080807d 0%, #8080807d 100%)`,
                                    }}
                                ></div>
                            </motion.div>
                        </span>
                    </div>
                )}
            </div>
            <span className={`text-xs ${isReCast && 'text-stone-600'}`}>
                {skill.name}
            </span>
        </div>
    )
}

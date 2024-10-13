import { SkillDescription } from '@/app/_components/high-score/skill/SkillDescription'
import type { AttackSkill } from '@/app/_game-config/skills'
import { useGameContext } from '@/app/_providers/GameProvider'
import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type Props = {
    skill: AttackSkill
    invoke: boolean
}

enum ReCastPhase {
    half,
    full,
}

const skillIconSize = 30
const overSize = 8
const reCastTimeMotionFullSize = skillIconSize + overSize
const reCastTimeMotionHalfSize = reCastTimeMotionFullSize / 2
const centerPosition = overSize / 2
const skillMotionColor = '#242323de'

export const SkillIcon = ({ skill, invoke }: Props) => {
    const { invokeSkill, updateSkillStateIsAvailable } = useGameContext()
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)
    const [isReCast, setIsReCast] = useState(false)
    const [reCastPhase, setReCastPhase] = useState<
        ReCastPhase.half | ReCastPhase.full
    >(ReCastPhase.half)

    const firstControls = useAnimation()
    const secondControls = useAnimation()

    const reCastMotionDuration = skill.reCastTimeForSeconds / 2

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
        updateSkillStateIsAvailable(skill.id, true)
    }

    useEffect(() => {
        if (!isReCast) return

        if (reCastPhase === ReCastPhase.half) {
            reCastMotionFist()
            reCastMotionSecond()
        }

        if (reCastPhase === ReCastPhase.full) {
            reCastMotionSecond()
        }
    }, [isReCast, reCastPhase])

    useEffect(() => {
        if (invoke && !isReCast) {
            setIsReCast(true)
            invokeSkill(skill)
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
                style={{
                    width: `${skillIconSize}px`,
                    height: `${skillIconSize}px`,
                }}
                onClick={() => setIsDescriptionOpen(true)}
            >
                <Image
                    key={skill.id}
                    src={skill.iconUrl}
                    alt="skill logo"
                    width={skillIconSize}
                    height={skillIconSize}
                />
                {isReCast && reCastPhase === ReCastPhase.half && (
                    <div>
                        <motion.div
                            className="absolute inset-0 bg-transparent"
                            style={{
                                width: `${reCastTimeMotionFullSize}px`,
                                height: `${reCastTimeMotionFullSize}px`,
                                top: `-${centerPosition}px`,
                                left: `-${centerPosition}px`,
                                zIndex: 20,
                            }}
                            initial={{ rotate: 0 }}
                            animate={firstControls}
                        >
                            <div
                                style={{
                                    width: `${reCastTimeMotionHalfSize}px`,
                                    height: `${reCastTimeMotionFullSize}px`,
                                    borderRadius: `${reCastTimeMotionFullSize}px 0 0 ${reCastTimeMotionFullSize}px`,
                                    background: `conic-gradient(${skillMotionColor} 0%, ${skillMotionColor} 100%)`,
                                    isolation: 'isolate',
                                }}
                            ></div>
                        </motion.div>
                        <span
                            className="absolute overflow-hidden"
                            style={{
                                width: `${reCastTimeMotionHalfSize}px`,
                                height: `${reCastTimeMotionFullSize}px`,
                                top: `-${centerPosition}px`,
                                right: `-${centerPosition}px`,
                                zIndex: 15,
                            }}
                        >
                            <motion.div
                                className="absolute inset-0 flex bg-transparent"
                                style={{
                                    width: `${reCastTimeMotionFullSize}px`,
                                    height: `${reCastTimeMotionFullSize}px`,
                                    left: `-${reCastTimeMotionHalfSize}px`,
                                    zIndex: 10,
                                }}
                                initial={{ rotate: 0 }}
                                animate={secondControls}
                            >
                                <div
                                    style={{
                                        width: `${reCastTimeMotionHalfSize}px`,
                                        height: `${reCastTimeMotionFullSize}px`,
                                    }}
                                ></div>
                                <div
                                    style={{
                                        right: 0,
                                        width: `${reCastTimeMotionHalfSize}px`,
                                        height: `${reCastTimeMotionFullSize}px`,
                                        borderRadius: `0 ${reCastTimeMotionFullSize}px ${reCastTimeMotionFullSize}px 0`,
                                        background: `conic-gradient(${skillMotionColor} 0%, ${skillMotionColor} 100%)`,
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
                                width: `${reCastTimeMotionHalfSize}px`,
                                height: `${reCastTimeMotionFullSize}px`,
                                top: `-${centerPosition}px`,
                                right: `-${centerPosition}px`,
                                zIndex: 15,
                            }}
                        >
                            <motion.div
                                className="absolute inset-0 flex bg-transparent"
                                style={{
                                    width: `${reCastTimeMotionFullSize}px`,
                                    height: `${reCastTimeMotionFullSize}px`,
                                    left: `-${reCastTimeMotionHalfSize}px`,
                                    zIndex: 10,
                                }}
                                initial={{ rotate: 0 }}
                                animate={secondControls}
                            >
                                <div
                                    style={{
                                        width: `${reCastTimeMotionHalfSize}px`,
                                        height: `${reCastTimeMotionFullSize}px`,
                                    }}
                                ></div>
                                <div
                                    style={{
                                        right: 0,
                                        width: `${reCastTimeMotionHalfSize}px`,
                                        height: `${reCastTimeMotionFullSize}px`,
                                        borderRadius: `0 ${reCastTimeMotionFullSize}px ${reCastTimeMotionFullSize}px 0`,
                                        background: `conic-gradient(${skillMotionColor} 0%, ${skillMotionColor} 100%)`,
                                    }}
                                ></div>
                            </motion.div>
                        </span>
                    </div>
                )}
            </div>
            <span
                className={`text-xs ${isReCast && 'text-stone-600'} whitespace-nowrap`}
            >
                {skill.displayName}
            </span>
        </div>
    )
}

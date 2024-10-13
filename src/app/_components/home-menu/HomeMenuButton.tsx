import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Props = {
    label: string
    path: string
}

export const HomeMenuButton = ({ label, path }: Props) => {
    const buttonHoverBgColor = '#4f4859'
    const [isHovered, setIsHovered] = useState(false)
    const router = useRouter()

    return (
        <motion.button
            className="relative my-3 w-96 rounded-3xl text-xl tracking-[.15em] outline-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onMouseEnter={() => setIsHovered(true)}
            onFocus={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => router.push(`/pages/high-score/${path}/`)}
            whileHover={{
                backgroundColor: buttonHoverBgColor,
                transition: { duration: 0.3 },
            }}
            whileFocus={{
                backgroundColor: buttonHoverBgColor,
                transition: { duration: 0.3 },
            }}
            transition={{ duration: `${isHovered ? 0.3 : 5}` }}
        >
            {label}
        </motion.button>
    )
}

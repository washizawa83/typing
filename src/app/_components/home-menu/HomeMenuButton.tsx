import { motion } from 'framer-motion'

type Props = {
    label: string
}

export const HomeMenuButton = ({ label }: Props) => {
    const buttonHoverBgColor = '#4f4859'

    return (
        <motion.button
            className="relative w-96 rounded-3xl text-xl tracking-[.15em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{
                backgroundColor: buttonHoverBgColor,
                transition: { duration: 0.3 },
            }}
            transition={{ duration: 5 }}
        >
            {label}
        </motion.button>
    )
}

import { motion } from 'framer-motion'

type Props = {
    label: string
}

export const HomeMenuButton = ({ label }: Props) => {
    return (
        <motion.button
            className="relative w-96 rounded-3xl text-xl tracking-[.15em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{
                backgroundColor: '#4f4859',
                transition: { duration: 0.3 },
            }}
            transition={{ duration: 1 }}
        >
            {label}
        </motion.button>
    )
}

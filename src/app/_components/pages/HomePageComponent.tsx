'use client'
import { HomeMenuButton } from '@/app/_components/home-menu/HomeMenuButton'
import { BasePage } from '@/app/_components/layouts/BasePage'
import { OrbEffect } from '@/app/_components/layouts/OrbEffect'
import { motion } from 'framer-motion'
import Image from 'next/image'
import logoUrl from '../../../../public/typeranker.svg'

export const HomePageComponent = () => {
    return (
        <div className="-z-100 bg-[#2f2e35] bg-cover bg-center">
            <OrbEffect />
            <BasePage>
                <div className="flex h-3/5 flex-col items-center justify-center">
                    <motion.div
                        initial={{ scale: 1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 2 }}
                    >
                        <Image src={logoUrl} alt="title logo" />
                    </motion.div>
                </div>
                <div className="flex items-center justify-center">
                    <HomeMenuButton label="training" />
                </div>
            </BasePage>
        </div>
    )
}

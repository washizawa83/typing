'use client'
import { HomeMenuButton } from '@/app/_components/home-menu/HomeMenuButton'
import { BasePage } from '@/app/_components/layouts/BasePage'
import { OrbEffect } from '@/app/_components/layouts/OrbEffect'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import logoUrl from '../../../../public/typeranker.svg'

export const HomePageComponent = () => {
    return (
        <div className="-z-100 bg-background bg-cover bg-center">
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
                <div className="flex flex-col items-center justify-center">
                    <HomeMenuButton label="training" path="training" />
                    <HomeMenuButton label="performance" path="performance" />
                </div>
                <footer className="absolute bottom-5 left-0 m-auto flex w-96 flex-col text-center text-sm">
                    <div className="flex justify-around bg-[#181716d9]">
                        <Link href="/pages/policy/terms-of-use">利用規約</Link>
                        <Link href="/pages/policy/privacy-policy">
                            プライバシーポリシー
                        </Link>
                        <p>&copy; 2024 Typerancker</p>
                    </div>
                </footer>
            </BasePage>
        </div>
    )
}

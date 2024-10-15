'use client'
import { BasePage } from '@/app/_components/layouts/BasePage'
import { OrbEffect } from '@/app/_components/layouts/OrbEffect'
import { createClient } from '@/app/_utils/supabase/client'
import { IconContext } from 'react-icons'
import { FcGoogle } from 'react-icons/fc'

export const LoginPageComponent = () => {
    const supabase = createClient()
    const authCallBack = async (provider: 'google') => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `http://localhost:3000/auth/callback`,
            },
        })

        if (error) {
            console.log('認証エラー')
        }
    }

    return (
        <div className="bg-background">
            <OrbEffect />
            <BasePage>
                <div className="flex h-full flex-col items-center justify-center md:flex-row">
                    <div className="flex min-h-80 flex-col overflow-hidden rounded md:flex-row">
                        <div className="z-10 bg-[#5c2abc] p-2 text-center">
                            <h1 className="py-5 text-3xl">Login</h1>
                            <p>ログイン方法を選択してください。</p>
                        </div>
                        <div className="md:max-w-1/2 flex flex-col items-center justify-start bg-lightGray p-5 md:w-96">
                            <button
                                className="z-10 flex w-60 items-center rounded bg-white p-2"
                                onClick={() => authCallBack('google')}
                            >
                                <IconContext.Provider value={{ size: '28px' }}>
                                    <FcGoogle />
                                </IconContext.Provider>
                                <span className="ml-3 text-slate-700">
                                    Login With Google
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </BasePage>
        </div>
    )
}

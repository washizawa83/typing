'use client'
import { BasePage } from '@/app/_components/layouts/BasePage'
import { OrbEffect } from '@/app/_components/layouts/OrbEffect'
import { getPlayer, getUser, logout } from '@/app/_service/database-service'
import { createClient } from '@/app/_utils/supabase/client'
import { zodResolver } from '@hookform/resolvers/zod'
import type { User } from '@supabase/supabase-js'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { IconContext } from 'react-icons'
import { BsCheck, BsX } from 'react-icons/bs'
import { z } from 'zod'

type Player = {
    id: string
    name: string
    user_id: string
    created_at: string
}

type PlayerNameInput = {
    playerName: string
}

export const UserPageComponent = () => {
    const supabase = createClient()
    const [user, setUser] = useState<User | null>(null)
    const [player, setPlayer] = useState<Player | null>(null)
    const [isPlayerNameChangeFormVisible, setIsPlayerNameChangeFormVisible] =
        useState(false)
    const router = useRouter()

    const playerNameSchema = z.object({
        playerName: z
            .string()
            .min(1, '名前は必須です。')
            .max(20, '名前は20文字以内で入力してください。'),
    })

    const playerNameForm = useForm<PlayerNameInput>({
        resolver: zodResolver(playerNameSchema),
    })

    const onSubmitPlayerName: SubmitHandler<PlayerNameInput> = async (data) => {
        verifyPlayerName(data)
    }

    const verifyPlayerName = async (formData: PlayerNameInput) => {
        const { data, error } = await supabase
            .from('players')
            .update({
                ...player,
                name: formData.playerName,
            })
            .eq('user_id', user!.id)

        if (!error) {
            setPlayer({
                ...player!,
                name: formData.playerName,
            })
            setIsPlayerNameChangeFormVisible(false)
        }
    }

    const init = async () => {
        const fetchedUser = (await getUser()).data.user
        if (!fetchedUser) return

        setUser(fetchedUser)
        const fetchedPlayer = (await getPlayer(fetchedUser.id)).data?.[0]
        setPlayer(fetchedPlayer ?? null)
    }

    const handleLogout = async () => {
        await logout()
        router.push('/pages/home/')
    }

    useEffect(() => {
        init()
    }, [])

    if (!user || !player) return

    return (
        <div className="-z-100 bg-background bg-cover bg-center">
            <OrbEffect />
            <BasePage>
                <div className="flex h-full flex-col items-center justify-center">
                    <div className="z-10 w-4/5 rounded bg-lightGray p-2 md:w-1/2">
                        <div className="flex items-center justify-between border-b px-5 py-3">
                            <div className="flex size-14 items-center overflow-hidden rounded-full">
                                <Image
                                    src={user.user_metadata.avatar_url}
                                    width={56}
                                    height={56}
                                    alt="user avatar"
                                />
                            </div>
                            {isPlayerNameChangeFormVisible ? (
                                <form
                                    className="flex items-center"
                                    onSubmit={playerNameForm.handleSubmit(
                                        onSubmitPlayerName,
                                    )}
                                >
                                    <div className="flex flex-col">
                                        <input
                                            id="player-name"
                                            className="h-10 rounded px-2 text-gray-950 outline-none"
                                            type="text"
                                            defaultValue={player.name}
                                            {...playerNameForm.register(
                                                'playerName',
                                            )}
                                        />
                                        <span className="text-sm text-red-500">
                                            {
                                                playerNameForm.formState.errors
                                                    .playerName?.message
                                            }
                                        </span>
                                    </div>
                                    <div>
                                        <IconContext.Provider
                                            value={{
                                                size: '24px',
                                                color: '#38c72e',
                                            }}
                                        >
                                            <button type="submit">
                                                <BsCheck />
                                            </button>
                                        </IconContext.Provider>
                                        <IconContext.Provider
                                            value={{
                                                size: '24px',
                                                color: '#d33838',
                                            }}
                                        >
                                            <button
                                                onClick={() =>
                                                    setIsPlayerNameChangeFormVisible(
                                                        false,
                                                    )
                                                }
                                            >
                                                <BsX />
                                            </button>
                                        </IconContext.Provider>
                                    </div>
                                </form>
                            ) : (
                                <div className="flex items-center">
                                    <h2 className="mr-3 text-xl">
                                        {player.name}
                                    </h2>
                                    <button
                                        className="rounded bg-royalBlue p-1 text-sm"
                                        onClick={() =>
                                            setIsPlayerNameChangeFormVisible(
                                                true,
                                            )
                                        }
                                    >
                                        名前変更
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center justify-center p-2">
                            <button onClick={() => handleLogout()}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </BasePage>
        </div>
    )
}

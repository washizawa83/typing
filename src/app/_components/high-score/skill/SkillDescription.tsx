type Props = {
    description: string
    isOpen: boolean
    close: () => void
}

export const SkillDescription = ({ description, isOpen, close }: Props) => {
    return (
        isOpen && (
            <div>
                <div
                    className="fixed inset-0 z-40 h-screen w-screen"
                    onClick={() => close()}
                ></div>
                <div className="absolute -top-[100px] left-1 z-50 h-24 w-48 overflow-y-auto rounded bg-[#2e2e32] p-1 text-sm text-white">
                    <p>{description}</p>
                </div>
            </div>
        )
    )
}

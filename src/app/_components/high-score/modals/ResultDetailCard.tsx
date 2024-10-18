type Props = {
    label: string
    value: number | string
}

export const ResultDetailCard = ({ label, value }: Props) => {
    return (
        <div className="flex w-52 flex-col items-center justify-center rounded-md bg-[#3c3c41] p-2">
            <div className="mb-2 w-full border-b-4 border-royalBlue text-center">
                <h3>{label}</h3>
            </div>
            <div>
                <h2 className="text-2xl">{value}</h2>
            </div>
        </div>
    )
}

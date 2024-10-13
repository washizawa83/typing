import { IconContext } from 'react-icons'
import { BsFire } from 'react-icons/bs'
import { FaRegSnowflake } from 'react-icons/fa'

type Props = {
    type: 'heat' | 'cold'
}

export const StateIcon = ({ type }: Props) => {
    const color = type === 'heat' ? '#a66969' : '#7ea3b4'

    return (
        <IconContext.Provider value={{ color }}>
            {type === 'heat' ? <BsFire /> : <FaRegSnowflake />}
        </IconContext.Provider>
    )
}

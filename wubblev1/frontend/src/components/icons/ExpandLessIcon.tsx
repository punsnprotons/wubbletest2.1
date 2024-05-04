import { SvgIcon } from '@mui/material'

const ExpadLessIcon = (props: any) => {
    const { color, active, ...rest } = props

    return (
        <SvgIcon
            {...rest}
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
        >
            <path d="M1.81304 8.93949L0.855959 8.06774L8.79028 0.86145L16.7246 8.06648L15.7636 8.93949L8.79028 2.60791L1.81304 8.93949Z" fill="#9C9C9C" />
        </SvgIcon>
    )
}

export default ExpadLessIcon
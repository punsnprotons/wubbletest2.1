import { SvgIcon } from '@mui/material'

const PauseIcon = (props: any) => {
    const { color, active, ...rest } = props

    return (
        <SvgIcon
            {...rest}
            sx={{
                width: '18px !important',
                cursor: 'pointer',
                margin: { xs: '0px !important', md: '0px 0px 0px 0px !important' }
            }}
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect x="0.396484" y="0.193359" width="2.16406" height="16.9456" rx="1.08203" fill="#F8F8F8" />
            <rect x="6.56055" y="0.193359" width="2.16406" height="16.9456" rx="1.08203" fill="#F8F8F8" />
        </SvgIcon>
    )
}

export default PauseIcon
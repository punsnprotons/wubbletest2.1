import { SvgIcon } from '@mui/material'

function EnvelopeIcon(props: any) {
    const { color, active, ...rest } = props
    if (active) {
        return (
            <SvgIcon
                {...rest}
                sx={{
                    width: '20px !important',
                    margin: { xs: '0px !important', md: '0px 7px 1px 0px !important' }
                }}
                viewBox="0 0 16 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g clipPath="url(#clip0_1_189)">
                    <path d="M14.2458 0.396484H1.69416C1.29494 0.396484 0.970001 0.731648 0.970001 1.14342V10.1495C0.970001 10.5613 1.29494 10.8965 1.69416 10.8965H14.2458C14.6451 10.8965 14.97 10.5613 14.97 10.1495V1.14342C14.97 0.731648 14.6451 0.396484 14.2458 0.396484ZM8.08234 7.27365C8.01846 7.33992 7.91003 7.33992 7.84615 7.27365L1.73575 0.97105H14.1924L8.08234 7.27365ZM5.60126 5.77059L1.52705 9.97335V1.56822L5.60126 5.77059ZM5.99528 6.177L7.45214 7.67968C7.59325 7.82524 7.77894 7.89802 7.96425 7.89802C8.14956 7.89802 8.33524 7.82524 8.47635 7.67968L9.93321 6.177L13.9517 10.3219H1.97677L5.99528 6.177ZM10.3272 5.77059L14.413 1.55672V9.98522L10.3272 5.77059Z" fill="url(#paint0_linear_1_189)" />
                </g>
                <defs>
                    <linearGradient id="paint0_linear_1_189" x1="7.97" y1="0.396484" x2="7.97" y2="10.8965" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FBC013" />
                        <stop offset="1" stopColor="#893794" />
                    </linearGradient>
                    <clipPath id="clip0_1_189">
                        <rect width="14" height="10.5" fill="white" transform="translate(0.970001 0.396484)" />
                    </clipPath>
                </defs>
            </SvgIcon>
        )
    }
    return (
        <SvgIcon
            {...rest}
            sx={{
                width: '20px !important',
                margin: { xs: '0px !important', md: '0px 7px 1px 0px !important' }
            }}
            viewBox="0 0 16 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_1_187)">
                <path d="M14.2458 0.896484H1.69416C1.29494 0.896484 0.970001 1.23165 0.970001 1.64342V10.6495C0.970001 11.0613 1.29494 11.3965 1.69416 11.3965H14.2458C14.6451 11.3965 14.97 11.0613 14.97 10.6495V1.64342C14.97 1.23165 14.6451 0.896484 14.2458 0.896484ZM8.08234 7.77365C8.01846 7.83992 7.91003 7.83992 7.84615 7.77365L1.73575 1.47105H14.1924L8.08234 7.77365ZM5.60126 6.27059L1.52705 10.4733V2.06822L5.60126 6.27059ZM5.99528 6.677L7.45214 8.17968C7.59325 8.32524 7.77893 8.39802 7.96424 8.39802C8.14956 8.39802 8.33524 8.32524 8.47635 8.17968L9.93321 6.677L13.9517 10.8219H1.97677L5.99528 6.677ZM10.3272 6.27059L14.413 2.05672V10.4852L10.3272 6.27059Z" fill="#F8F8F8" />
            </g>
            <defs>
                <clipPath id="clip0_1_187">
                    <rect width="14" height="10.5" fill="white" transform="translate(0.970001 0.896484)" />
                </clipPath>
            </defs>
        </SvgIcon>
    )
}

export default EnvelopeIcon
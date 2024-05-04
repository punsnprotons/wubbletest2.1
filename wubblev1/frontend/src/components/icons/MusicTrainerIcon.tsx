import { SvgIcon } from '@mui/material'

const MusicTrainerIcon = (props: any) => {
    const { color, active, ...rest } = props

    return (
        <SvgIcon
            {...rest}
            xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17" fill="none"
        >
            <path d="M1.01935 1.81836H10.8161C11.0683 1.81836 11.273 1.61503 11.273 1.3645C11.273 1.11397 11.0683 0.910645 10.8161 0.910645H1.01935C0.767171 0.910645 0.5625 1.11397 0.5625 1.3645C0.5625 1.61503 0.767171 1.81836 1.01935 1.81836Z" fill={props.color ? props.color : '#F8F8F8'} />
            <path d="M1.01935 5.65442H10.8161C11.0683 5.65442 11.273 5.45109 11.273 5.20056C11.273 4.95003 11.0683 4.7467 10.8161 4.7467H1.01935C0.767171 4.7467 0.5625 4.95003 0.5625 5.20056C0.5625 5.45109 0.767171 5.65442 1.01935 5.65442Z" fill={props.color ? props.color : '#F8F8F8'} />
            <path d="M5.23825 8.58252H1.01935C0.767171 8.58252 0.5625 8.78585 0.5625 9.03638C0.5625 9.28691 0.767171 9.49024 1.01935 9.49024H5.23825C5.49044 9.49024 5.69511 9.28691 5.69511 9.03638C5.69511 8.78585 5.49044 8.58252 5.23825 8.58252Z" fill={props.color ? props.color : '#F8F8F8'} />
            <path d="M19.5237 0.212891C19.3842 0.212891 19.0144 0.212892 14.6877 2.20321C14.385 2.34239 14.1888 2.64678 14.1888 2.979V10.0495C13.4353 9.08128 12.256 8.45616 10.9318 8.45616C8.66271 8.45616 6.81641 10.2904 6.81641 12.5445C6.81641 14.7987 8.66271 16.6329 10.9318 16.6329C13.1703 16.6329 14.9959 14.8483 15.0447 12.6359C15.0812 12.5705 15.1019 12.4955 15.1019 12.4156V3.01229C17.8047 1.76993 19.277 1.16841 19.5468 1.12C19.788 1.1079 19.9799 0.909412 19.9799 0.666749C19.9805 0.415614 19.7758 0.212891 19.5237 0.212891ZM10.9318 15.7246C9.16647 15.7246 7.73012 14.2976 7.73012 12.5439C7.73012 10.7902 9.16647 9.36328 10.9318 9.36328C12.697 9.36328 14.1334 10.7902 14.1334 12.5439C14.1334 14.2976 12.697 15.7246 10.9318 15.7246Z"
                fill={props.color ? props.color : '#F8F8F8'}
            />
        </SvgIcon>
    )
}

export default MusicTrainerIcon
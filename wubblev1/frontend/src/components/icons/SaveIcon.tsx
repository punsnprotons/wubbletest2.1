import { SvgIcon } from '@mui/material'

const SaveIcon = (props: any) => {
    const { color, active, ...rest } = props

    if (active) {
        return (
            <SvgIcon
                {...rest}
                width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M19.0259 9.75745C18.8084 9.75745 18.6319 9.93395 18.6319 10.1514C18.6319 13.423 15.9702 16.0847 12.6987 16.0847C12.4812 16.0847 12.3047 16.2612 12.3047 16.4786C12.3047 16.6961 12.4812 16.8726 12.6987 16.8726C16.4046 16.8726 19.4199 13.8574 19.4199 10.1514C19.4199 9.93395 19.2434 9.75745 19.0259 9.75745Z" fill="#FBC013" />
                <path d="M13.7311 9.60199C13.7311 8.64437 12.9521 7.86536 11.9944 7.86536C11.0368 7.86536 10.2578 8.64437 10.2578 9.60199C10.2578 10.5596 11.0368 11.3386 11.9944 11.3386C12.9521 11.3386 13.7311 10.5596 13.7311 9.60199ZM11.0458 9.60199C11.0458 9.0788 11.4713 8.6533 11.9944 8.6533C12.5176 8.6533 12.9431 9.0788 12.9431 9.60199C12.9431 10.1252 12.5176 10.5507 11.9944 10.5507C11.4713 10.5507 11.0458 10.1252 11.0458 9.60199Z" fill="#FBC013" />
                <path d="M21.606 0.249512C21.4957 0.249512 21.3113 0.249512 19.0841 1.27752C18.8225 1.39834 18.6533 1.66256 18.6533 1.95095V3.17648C16.9687 1.43196 14.6075 0.345116 11.9967 0.345116C7.02374 0.345116 2.95477 4.28748 2.74938 9.21058C2.72469 9.21478 2.7 9.21899 2.67532 9.22371C1.50495 9.44959 0.663947 10.1808 0.242132 11.3386C-0.191764 12.5305 -0.0420541 13.7061 0.687586 14.8339C1.04216 15.3823 1.48236 15.8871 2.03235 16.3772C2.84446 17.1011 3.67916 17.8244 4.48654 18.5241L4.89313 18.8761C5.09747 19.0536 5.3286 19.1419 5.56236 19.1419C5.80294 19.1419 6.04616 19.0478 6.26468 18.8598L6.46062 18.6912C6.82675 18.376 7.19971 18.055 7.57372 17.7325C8.92374 18.4679 10.4497 18.8572 11.9967 18.8572C17.1005 18.8572 21.253 14.7047 21.253 9.60088C21.253 7.54538 20.5791 5.64433 19.4413 4.10678V1.9809C20.7461 1.3789 21.481 1.07476 21.6417 1.03588C21.8429 1.01802 22 0.848877 22 0.643486C22 0.426012 21.8235 0.249512 21.606 0.249512ZM5.94635 18.095L5.75041 18.2636C5.5965 18.396 5.51455 18.3734 5.40897 18.282L5.00239 17.9295C4.19711 17.2319 3.36398 16.5101 2.5566 15.7899C2.05967 15.3471 1.66464 14.8943 1.34894 14.4063C0.752197 13.4844 0.632429 12.5693 0.982278 11.6091C1.30849 10.7129 1.92834 10.1708 2.8245 9.998C2.88281 9.98697 2.94059 9.97804 2.99785 9.97069C3.0404 9.98645 3.08662 9.99538 3.13443 9.99538C3.20219 9.99538 3.26575 9.97857 3.32091 9.9481C4.01745 9.9481 4.61682 10.2607 5.14264 10.8936C5.16103 10.9157 5.17889 10.9388 5.19622 10.9619C5.20936 10.9793 5.22249 10.9966 5.23562 11.0129C5.26766 11.0533 5.29918 11.078 5.31442 11.0896L5.6317 11.3522L5.91903 10.9861C5.9432 10.9551 5.96736 10.9241 5.99205 10.8942C6.37972 10.4198 6.81519 10.1304 7.32316 10.0101C8.27552 9.78421 9.28777 10.1798 9.84091 10.9934C10.1141 11.3953 10.2722 11.8397 10.3242 12.3508C10.3284 12.3907 10.3347 12.4259 10.3405 12.4548V12.8488C10.3315 12.9024 10.3226 12.9565 10.3142 13.0101C10.2927 13.1445 10.2722 13.2722 10.2428 13.3925C10.1403 13.8122 9.93231 14.2288 9.60558 14.6663C9.12493 15.3103 8.52504 15.8635 7.94826 16.3651C7.28376 16.9446 6.60402 17.5292 5.94635 18.095ZM11.0712 12.0025C10.9808 11.472 10.787 10.985 10.4928 10.5517C10.2155 10.1435 9.85089 9.8152 9.43696 9.57987C9.44904 8.17837 10.5926 7.04162 11.9967 7.04162C13.4087 7.04162 14.557 8.19045 14.557 9.60193C14.557 11.0139 13.4082 12.1622 11.9967 12.1622C11.7089 12.1622 11.4268 12.115 11.1578 12.0215C11.1289 12.0115 11.1001 12.0057 11.0712 12.0025ZM20.4651 9.60193C20.4651 14.2713 16.6661 18.0703 11.9967 18.0703C10.6814 18.0703 9.38233 17.7624 8.21406 17.1794C8.29811 17.1063 8.38216 17.0339 8.46568 16.9608C9.07555 16.4303 9.71169 15.8425 10.237 15.1391C10.6278 14.6154 10.88 14.1053 11.0081 13.5805C11.0449 13.4293 11.0691 13.2801 11.0916 13.1356C11.1016 13.0747 11.1111 13.0132 11.1221 12.9528L11.1279 12.9187V12.8357C11.41 12.9113 11.701 12.9502 11.9962 12.9502C13.8426 12.9502 15.3445 11.4484 15.3445 9.60193C15.3445 7.7555 13.8426 6.25367 11.9962 6.25367C10.2633 6.25367 8.83392 7.5769 8.66477 9.26574C8.17414 9.13704 7.65147 9.12391 7.1414 9.24473C6.54099 9.38708 6.02357 9.69543 5.56656 10.185C4.97875 9.5599 4.29954 9.21951 3.53891 9.16751C3.76584 4.69932 7.47234 1.13359 11.9962 1.13359C14.6941 1.13359 17.1011 2.40166 18.6528 4.37258V5.09066C18.2452 4.73241 17.7115 4.51441 17.1279 4.51441C15.8524 4.51441 14.8144 5.55188 14.8144 6.8273C14.8144 8.10273 15.8519 9.14072 17.1279 9.14072C18.3901 9.14072 19.4192 8.12426 19.4402 6.8667C19.4407 6.86039 19.4413 6.85357 19.4413 6.84726V5.56869C20.0937 6.76794 20.4651 8.14265 20.4651 9.60193ZM17.1279 8.35277C16.2869 8.35277 15.6024 7.6683 15.6024 6.8273C15.6024 5.9863 16.2869 5.30236 17.1279 5.30236C17.9689 5.30236 18.6528 5.9863 18.6528 6.8273C18.6528 7.6683 17.9689 8.35277 17.1279 8.35277Z" fill="#FBC013" />
            </SvgIcon>

        )
    }
    return (
        <SvgIcon
            {...rest}
            width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M19.0259 9.75745C18.8084 9.75745 18.6319 9.93395 18.6319 10.1514C18.6319 13.423 15.9702 16.0847 12.6987 16.0847C12.4812 16.0847 12.3047 16.2612 12.3047 16.4786C12.3047 16.6961 12.4812 16.8726 12.6987 16.8726C16.4046 16.8726 19.4199 13.8574 19.4199 10.1514C19.4199 9.93395 19.2434 9.75745 19.0259 9.75745Z" fill="#F8F8F8" />
            <path d="M13.7311 9.60199C13.7311 8.64437 12.9521 7.86536 11.9944 7.86536C11.0368 7.86536 10.2578 8.64437 10.2578 9.60199C10.2578 10.5596 11.0368 11.3386 11.9944 11.3386C12.9521 11.3386 13.7311 10.5596 13.7311 9.60199ZM11.0458 9.60199C11.0458 9.0788 11.4713 8.6533 11.9944 8.6533C12.5176 8.6533 12.9431 9.0788 12.9431 9.60199C12.9431 10.1252 12.5176 10.5507 11.9944 10.5507C11.4713 10.5507 11.0458 10.1252 11.0458 9.60199Z" fill="#F8F8F8" />
            <path d="M21.606 0.249512C21.4957 0.249512 21.3113 0.249512 19.0841 1.27752C18.8225 1.39834 18.6533 1.66256 18.6533 1.95095V3.17648C16.9687 1.43196 14.6075 0.345116 11.9967 0.345116C7.02374 0.345116 2.95477 4.28748 2.74938 9.21058C2.72469 9.21478 2.7 9.21899 2.67532 9.22371C1.50495 9.44959 0.663947 10.1808 0.242132 11.3386C-0.191764 12.5305 -0.0420541 13.7061 0.687586 14.8339C1.04216 15.3823 1.48236 15.8871 2.03235 16.3772C2.84446 17.1011 3.67916 17.8244 4.48654 18.5241L4.89313 18.8761C5.09747 19.0536 5.3286 19.1419 5.56236 19.1419C5.80294 19.1419 6.04616 19.0478 6.26468 18.8598L6.46062 18.6912C6.82675 18.376 7.19971 18.055 7.57372 17.7325C8.92374 18.4679 10.4497 18.8572 11.9967 18.8572C17.1005 18.8572 21.253 14.7047 21.253 9.60088C21.253 7.54538 20.5791 5.64433 19.4413 4.10678V1.9809C20.7461 1.3789 21.481 1.07476 21.6417 1.03588C21.8429 1.01802 22 0.848877 22 0.643486C22 0.426012 21.8235 0.249512 21.606 0.249512ZM5.94635 18.095L5.75041 18.2636C5.5965 18.396 5.51455 18.3734 5.40897 18.282L5.00239 17.9295C4.19711 17.2319 3.36398 16.5101 2.5566 15.7899C2.05967 15.3471 1.66464 14.8943 1.34894 14.4063C0.752197 13.4844 0.632429 12.5693 0.982278 11.6091C1.30849 10.7129 1.92834 10.1708 2.8245 9.998C2.88281 9.98697 2.94059 9.97804 2.99785 9.97069C3.0404 9.98645 3.08662 9.99538 3.13443 9.99538C3.20219 9.99538 3.26575 9.97857 3.32091 9.9481C4.01745 9.9481 4.61682 10.2607 5.14264 10.8936C5.16103 10.9157 5.17889 10.9388 5.19622 10.9619C5.20936 10.9793 5.22249 10.9966 5.23562 11.0129C5.26766 11.0533 5.29918 11.078 5.31442 11.0896L5.6317 11.3522L5.91903 10.9861C5.9432 10.9551 5.96736 10.9241 5.99205 10.8942C6.37972 10.4198 6.81519 10.1304 7.32316 10.0101C8.27552 9.78421 9.28777 10.1798 9.84091 10.9934C10.1141 11.3953 10.2722 11.8397 10.3242 12.3508C10.3284 12.3907 10.3347 12.4259 10.3405 12.4548V12.8488C10.3315 12.9024 10.3226 12.9565 10.3142 13.0101C10.2927 13.1445 10.2722 13.2722 10.2428 13.3925C10.1403 13.8122 9.93231 14.2288 9.60558 14.6663C9.12493 15.3103 8.52504 15.8635 7.94826 16.3651C7.28376 16.9446 6.60402 17.5292 5.94635 18.095ZM11.0712 12.0025C10.9808 11.472 10.787 10.985 10.4928 10.5517C10.2155 10.1435 9.85089 9.8152 9.43696 9.57987C9.44904 8.17837 10.5926 7.04162 11.9967 7.04162C13.4087 7.04162 14.557 8.19045 14.557 9.60193C14.557 11.0139 13.4082 12.1622 11.9967 12.1622C11.7089 12.1622 11.4268 12.115 11.1578 12.0215C11.1289 12.0115 11.1001 12.0057 11.0712 12.0025ZM20.4651 9.60193C20.4651 14.2713 16.6661 18.0703 11.9967 18.0703C10.6814 18.0703 9.38233 17.7624 8.21406 17.1794C8.29811 17.1063 8.38216 17.0339 8.46568 16.9608C9.07555 16.4303 9.71169 15.8425 10.237 15.1391C10.6278 14.6154 10.88 14.1053 11.0081 13.5805C11.0449 13.4293 11.0691 13.2801 11.0916 13.1356C11.1016 13.0747 11.1111 13.0132 11.1221 12.9528L11.1279 12.9187V12.8357C11.41 12.9113 11.701 12.9502 11.9962 12.9502C13.8426 12.9502 15.3445 11.4484 15.3445 9.60193C15.3445 7.7555 13.8426 6.25367 11.9962 6.25367C10.2633 6.25367 8.83392 7.5769 8.66477 9.26574C8.17414 9.13704 7.65147 9.12391 7.1414 9.24473C6.54099 9.38708 6.02357 9.69543 5.56656 10.185C4.97875 9.5599 4.29954 9.21951 3.53891 9.16751C3.76584 4.69932 7.47234 1.13359 11.9962 1.13359C14.6941 1.13359 17.1011 2.40166 18.6528 4.37258V5.09066C18.2452 4.73241 17.7115 4.51441 17.1279 4.51441C15.8524 4.51441 14.8144 5.55188 14.8144 6.8273C14.8144 8.10273 15.8519 9.14072 17.1279 9.14072C18.3901 9.14072 19.4192 8.12426 19.4402 6.8667C19.4407 6.86039 19.4413 6.85357 19.4413 6.84726V5.56869C20.0937 6.76794 20.4651 8.14265 20.4651 9.60193ZM17.1279 8.35277C16.2869 8.35277 15.6024 7.6683 15.6024 6.8273C15.6024 5.9863 16.2869 5.30236 17.1279 5.30236C17.9689 5.30236 18.6528 5.9863 18.6528 6.8273C18.6528 7.6683 17.9689 8.35277 17.1279 8.35277Z" fill="#F8F8F8" />
        </SvgIcon>
    )
}

export default SaveIcon
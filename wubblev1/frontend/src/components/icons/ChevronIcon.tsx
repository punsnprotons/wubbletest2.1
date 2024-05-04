import { useState, useEffect } from 'react'

function ChevronIcon(props: any) {
    const { color } = props
    const [fill, setFill] = useState('#F8F8F8')
    useEffect(() => {
        if (color) {
            setFill(color)
        }
    }, [color])

    return (
        <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className} style={{ marginRight: '2%', pointerEvents: 'none' }}>
            <path d="M15.0424 0.877656L15.9995 1.7339L8.06518 8.81198L0.130859 1.73514L1.0919 0.877656L8.06518 7.0966L15.0424 0.877656Z" fill={fill} />
        </svg>
    )
}

export default ChevronIcon
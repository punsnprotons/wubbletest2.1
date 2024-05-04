import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getCurrentDimension } from '../../constants'

const Footer = () => {

    const [path, setPath] = useState<string>('')
    const location = useLocation()

    useEffect(() => {
        let path = location.pathname
        setPath(path)
    }, [location.pathname])

    const [screenSize, setScreenSize] = useState(getCurrentDimension());

    useEffect(() => {
        const updateDimension = () => {
            setScreenSize(getCurrentDimension())
        }
        window.addEventListener('resize', updateDimension);

        return (() => {
            window.removeEventListener('resize', updateDimension);
        })
    }, [screenSize])

    return (
        <Box
            sx={{
                position: 'absolute',
                bottom: { xs: '5px', md: '12px' },
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                marginBottom: screenSize.width <= 768 ? '60px' : '0px'
            }}
        >
            <Box
                sx={{
                    textAlign: 'center',
                    width: { xs: '250px', md: '370px' },
                }}
            >
                <Typography
                    fontSize={11}
                    color={
                        path === '/sign-in' ?
                            'var(--wbl-footer-mbl)'
                            :
                            'inherit'
                    }
                >
                    © 2024 Wubble.ai V001. All Rights Reserved.
                </Typography>
            </Box>
        </Box>
    )
}

export default Footer
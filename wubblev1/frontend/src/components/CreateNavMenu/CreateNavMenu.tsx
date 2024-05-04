import React, { useEffect, useState } from 'react'
import { Box, Menu, Fade, MenuItem, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getCurrentDimension } from '../../constants'

interface CreateNavMenuProps {
    value: number
}

const CreateNavMenu: React.FC<CreateNavMenuProps> = ({ value }) => {

    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

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

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const menuItembasicStyle = {
        color: 'var(--wbl-font-link)',
        fontSize: '16px',
        display: 'flex',
        justifyContent: 'center'
    }

    const navigateMenu = (e: any) => {
        const menu = e.target.id

        setTimeout(() => {
            navigate(`/${menu}`)
        }, 200)
    }

    return (
        <Box
            sx={{
                position: 'relative',
            }}
        >
            <Typography
                sx={{
                    fontSize: '14px',
                    color: value === 3 ? '#FBC013 !important' : 'inherit',
                }}
            >
                Create
            </Typography>
            {
                screenSize.width > 900 ?
                    <Box
                        sx={{
                            height: '30px',
                            width: '70px',
                            background: 'transparent',
                            position: 'absolute',
                            top: '-5px',
                            left: '-25px',
                        }}
                        onMouseOver={handleClick}
                    />
                    :
                    <Box
                        sx={{
                            height: '40px',
                            width: '40px',
                            background: 'transparent',
                            position: 'absolute',
                            top: '-20px',
                            left: '2px',
                        }}
                        onClick={handleClick}
                    />
            }
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onBlur={handleClose}
                TransitionComponent={Fade}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                sx={{
                    "& .MuiPaper-root": {
                        background: 'none',
                        boxShadow: 'none',
                        overflow: 'visible',
                    },
                }}
            >
                <Box
                    sx={{
                        background: 'var(--wbl-dropdown-menu-bg)',
                        borderRadius: '7px',
                        py: '20px',
                        px: '30px',
                        position: 'relative',
                        mb: '35px',
                        "&::before": {
                            display: screenSize.width > 900 ? 'block' : 'none',
                            content: "''",
                            position: 'absolute',
                            top: '-7px',
                            left: '45%',
                            width: 0,
                            height: 0,
                            borderLeft: '12px solid transparent',
                            borderRight: '12px solid transparent',
                            borderBottom: '15px solid var(--wbl-dropdown-menu-bg)'
                        },
                    }}
                >
                    <MenuItem
                        id='song-creation'
                        sx={menuItembasicStyle}
                        onClick={(e) => {
                            navigateMenu(e)
                        }}
                        onBlur={handleClose}
                    >
                        Song Creation
                    </MenuItem>
                    <MenuItem
                        id='artist-selection'
                        sx={menuItembasicStyle}
                        onClick={(e) => {
                            navigateMenu(e)
                        }}
                        onBlur={handleClose}
                    >
                        Artist Selection
                    </MenuItem>
                    <MenuItem
                        id='lyric-creation'
                        sx={menuItembasicStyle}
                        onClick={(e) => {
                            navigateMenu(e)
                        }}
                        onBlur={handleClose}
                    >
                        Lyrics Creation
                    </MenuItem>
                </Box>
            </Menu>
        </Box>
    )
}

export default CreateNavMenu
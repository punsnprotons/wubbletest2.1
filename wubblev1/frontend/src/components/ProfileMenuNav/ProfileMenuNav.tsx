import React, { useEffect, useState } from 'react'
import { Box, Menu, Fade, MenuItem } from '@mui/material'
import ProfileIcon from '../icons/ProfileIcon'
import { useNavigate } from 'react-router-dom'
import { useSignOutMutation } from '../../api/auth/authRest'
import { getCurrentDimension } from '../../constants'

const ProfileMenuNav = () => {

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

    // post
    const [logout] = useSignOutMutation()

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const menuItembasicStyle = {
        color: 'var(--wbl-font-link)',
        fontSize: '16px'
    }

    const navigateMenu = (e: any) => {
        const menu = e.target.id

        setTimeout(() => {
            navigate(`/${menu}`)
        }, 200)
    }

    const handleLogout = async (): Promise<void> => {
        const res = await logout(null).unwrap()

        if (res) {
            navigate('/sign-in')
        }
    }

    return (
        <Box
            sx={{
                position: 'relative',
            }}
        >
            {
                screenSize.width > 900 ?
                    <Box
                        onMouseOver={handleClick}
                        sx={{
                            height: 'fit-content',
                            display: 'flex',
                            alignItems: 'center',
                            zIndex: '999',
                            cursor: 'pointer'
                        }}
                    >
                        <ProfileIcon />
                    </Box>
                    :
                    <Box
                        onClick={handleClick}
                        sx={{
                            height: 'fit-content',
                            display: 'flex',
                            alignItems: 'center',
                            zIndex: '999',
                            cursor: 'pointer'
                        }}
                    >
                        <ProfileIcon />
                    </Box>
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
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
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
                        width: '140px',
                        py: '20px',
                        px: '30px',
                        position: 'relative',
                        "&::before": {
                            content: "''",
                            position: 'absolute',
                            top: '-7px',
                            right: '0px',
                            width: 0,
                            height: 0,
                            borderLeft: '12px solid transparent',
                            borderRight: '12px solid transparent',
                            borderBottom: '15px solid var(--wbl-dropdown-menu-bg)'
                        },
                    }}
                >
                    <MenuItem
                        id='wait-list'
                        sx={menuItembasicStyle}
                        onClick={(e) => {
                            navigateMenu(e)
                        }}
                        onBlur={handleClose}
                    >
                        Wait List
                    </MenuItem>
                    <MenuItem
                        id='profile-setting'
                        sx={menuItembasicStyle}
                        onClick={(e) => {
                            navigateMenu(e)
                        }}
                        onBlur={handleClose}
                    >
                        Settings
                    </MenuItem>
                    <MenuItem
                        onClick={() => handleLogout()}
                        sx={menuItembasicStyle}
                        onBlur={handleClose}
                    >
                        Logout
                    </MenuItem>
                </Box>
            </Menu>
        </Box>
    )
}

export default ProfileMenuNav
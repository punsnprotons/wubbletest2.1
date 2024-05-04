import { useEffect, useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import styles from './MobileNavbar.module.css'
import { Box, Tab, Tabs, CardMedia, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import HomeIcon from '../../icons/HomeIcon';
import BookIcon from '../../icons/BookIcon';
import EnvelopeIcon from '../../icons/EnvelopeIcon';
import { getAuthToken } from '../../../constants';
import MusicNoteIcon from '../../icons/MusicNoteIcon';
import MusicTabIcon from '../../icons/MusicTabIcon';
import { useAppSelector } from '../../../redux/hooks';
import { getUserState } from '../../../redux/slices/user/userSlice';
import CreateNavMenu from '../../CreateNavMenu/CreateNavMenu';


const StyledTabs = styled(Tabs)({
    borderBottom: 'none',
    height: 48,
    '& .MuiTabs-indicator': {
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-scrollButtons.Mui-disabled': {
        width: 'auto',
        opacity: 0.5
    }
});

const StyledTab = styled((props: any) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
        color: 'var(--wbl-font-primary)',
        fontSize: '10px',
        minHeight: 40,
        '&.Mui-selected': {
            color: 'var(--wbl-font-yellow)',
        },
        '&.MuiTab-iconWrapper': {
            marginRight: 8,
        }
    }),
);

const MobileNavbar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [value, setValue] = useState(0)
    const [isLoggedIn] = useState<any>(getAuthToken())

    useEffect(() => {
        let path = location.pathname

        if ((path.includes("/sign-up") || path.includes("/sign-in")) && isLoggedIn === null) {
            setValue(0)
        }
        if (path.includes("/about-us")) {
            setValue(1)
        }
        if (path.includes("/contact")) {
            setValue(2)
        }
        if (path.includes("/song-creation") || path.includes("/lyric-creation") || path.includes("/artist-selection")) {
            setValue(3)
        }
        if (path.includes("/my-music")) {
            setValue(4)
        }

    }, [location.pathname, isLoggedIn])

    const navigateHome = (): void => {
        navigate('/')
    }

    const handleNavigate = (menu: string) => {
        navigate(`/${menu}`)
    }

    return (
        <Box className={styles.navContainer}>
            <Box className={styles.navMenu}>
                {
                    !isLoggedIn ?
                        <>
                            <Box
                                className={`${styles.menu}`}
                                sx={{
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleNavigate('sign-in')}
                            >
                                <HomeIcon
                                    active={value === 0 ? true : false}
                                />
                                <Typography
                                    sx={{
                                        fontSize: '14px',
                                        color: value === 0 ? '#FBC013 !important' : 'inherit'
                                    }}
                                >
                                    Home
                                </Typography>
                            </Box>
                            <Box
                                className={`${styles.menu}`}
                                sx={{
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleNavigate('about-us')}
                            >
                                <BookIcon
                                    active={value === 1 ? true : false}
                                />
                                <Typography
                                    sx={{
                                        fontSize: '14px',
                                        color: value === 1 ? '#FBC013 !important' : 'inherit'
                                    }}
                                >
                                    About Us
                                </Typography>
                            </Box>
                            <Box
                                className={`${styles.menu}`}
                                sx={{
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleNavigate('contact')}
                            >
                                <EnvelopeIcon
                                    active={value === 2 ? true : false}
                                />
                                <Typography
                                    sx={{
                                        fontSize: '14px',
                                        color: value === 2 ? '#FBC013 !important' : 'inherit'
                                    }}
                                >
                                    Contact
                                </Typography>
                            </Box>
                        </>
                        :
                        <>
                            <Box
                                className={`${styles.menu}`}

                            >
                                <MusicTabIcon
                                    active={value === 3 ? true : false}
                                />
                                <CreateNavMenu value={value} />
                            </Box>

                            <Box
                                className={`${styles.menu}`}
                                sx={{
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleNavigate('my-music')}
                            >
                                <MusicNoteIcon
                                    active={value === 4 ? true : false}
                                />
                                <Typography
                                    sx={{
                                        fontSize: '14px',
                                        color: value === 4 ? '#FBC013 !important' : 'inherit'
                                    }}
                                >
                                    My Music
                                </Typography>
                            </Box>
                        </>
                }
            </Box>
        </Box>
    )
}

export default MobileNavbar
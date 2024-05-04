import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'
import { Box, CardMedia, Typography } from '@mui/material'
import HomeIcon from '../icons/HomeIcon';
import BookIcon from '../icons/BookIcon';
import EnvelopeIcon from '../icons/EnvelopeIcon';
import MusicNoteIcon from '../icons/MusicNoteIcon';
import MusicTabIcon from '../icons/MusicTabIcon';
import { getAuthToken } from '../../constants';
import ProfileMenuNav from '../ProfileMenuNav/ProfileMenuNav';
import CreateNavMenu from '../CreateNavMenu/CreateNavMenu';

const Navbar = (props: any) => {

    const location = useLocation()
    const navigate = useNavigate()
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
        if (!props.isInGeneratingDialog) {
            navigate('/')
        }
    }

    const handleNavigate = (menu: string) => {
        navigate(`/${menu}`)
    }

    return (
        <Box
            className={styles.navContainer}
        >
            <Box
                className={styles.navLogoBox}
            >
                <Box className={styles.navLogoContainer}>
                    <CardMedia
                        onClick={navigateHome}
                        component="img"
                        sx={{ width: { xs: '100%', sm: '245px' }, cursor: 'pointer' }}
                        className={styles.navLogo}
                        image={require("../../assets/logo/wbl-logo-and-text-sm.png")}
                        loading="lazy"
                    />
                </Box>
            </Box>
            {
                !props.isInGeneratingDialog &&
                <>
                    {
                        isLoggedIn &&
                        <Box
                            className={styles.navProfile}
                        >
                            <ProfileMenuNav />
                        </Box>
                    }
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
                </>
            }
        </Box>
    )
}

export default Navbar
import React, { useEffect } from 'react'
import { Box, Dialog, Typography } from '@mui/material'
import styles from './LoadingScreen.module.css'

interface LaodingScreenProps {
    type: string
    openLoadingScreen: boolean
}

const LoadingScreen: React.FC<LaodingScreenProps> = ({
    type, openLoadingScreen
}) => {

    const [index, setIndex] = React.useState(0);

    useEffect(() => {
        const intervalId = setInterval(
            () => setIndex((index) => index + 1),
            3000, // every 3 seconds
        );
        return () => clearTimeout(intervalId);
    }, []);

    return (
        <Dialog
            // open={true}
            open={openLoadingScreen}
        >
            <Box className={styles.loadingContainer}>
                <Box className={styles.logoBounce}>
                    <img
                        alt='wubble logo'
                        src={require('../../assets/logo/wbl-logo-sm.png')}
                    />
                </Box>
                <Box className={styles.logoText}>
                    <img
                        alt='wubble logo'
                        src={require('../../assets/logo/wbl-text-logo-sm.png')}
                    />
                </Box>
                <Box className={styles.textContent}>
                    <Typography>
                        {
                            type === 'genre' &&
                            'Creating your unique song, just a 1-3 min wait'
                        }
                        {
                            type === 'lyric' &&
                            'Creating your lyrics'
                        }

                    </Typography>
                    <Typography
                        fontSize={14}
                        color={'var(--wbl-font-secondary)'}
                    >
                        {
                            type === 'genre' &&
                            'Keep device active (Non sleep mode) for uninterrupted song creation'
                        }
                        {
                            type === 'lyric' &&
                            'Keep device active (Non sleep mode) for uninterrupted lyrics creation'
                        }

                    </Typography>
                    <Box>
                        <div className={styles.dotElastic}></div>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    )
}

export default LoadingScreen
import React, { useEffect } from 'react'
import { Box, Dialog, Typography } from '@mui/material'
import styles from './TransitionScreen.module.css'
import Navbar from '../navbar/Navbar'
import MusicTrainerIcon from '../icons/MusicTrainerIcon'
import { convertMsToTime } from '../../constants'

interface TransitionScreenProps {
    type: string
    openTransitionScreen: boolean
    setOpenTransitionScreen: (data: any) => void
    setValue?: (data: any) => void
    generationTime?: number
}

const TransitionScreen: React.FC<TransitionScreenProps> = ({
    type, openTransitionScreen, setOpenTransitionScreen, setValue, generationTime
}) => {

    useEffect(() => {
        if (openTransitionScreen && setValue) {
            setTimeout(() => {
                setOpenTransitionScreen(false)
                if (setValue) {
                    setValue(1)
                }
            }, 26000)
        }
    }, [openTransitionScreen])

    return (
        <Dialog
            fullScreen
            open={openTransitionScreen}
        >
            <Navbar
                isInGeneratingDialog={true}
            />
            <Box
                className={styles.transitionScreen}
            >
                <Box className={styles.textContent}>
                    <Typography className={styles.textTitle}>
                        <MusicTrainerIcon />
                        {
                            type === "song" ?
                                "Song Creator"
                                :
                                type === "lyrics" ?
                                    "Lyrics Creator"
                                    :
                                    "Music Trainer"
                        }
                    </Typography>
                    <Typography className={styles.textMsg} color={'var(--wbl-font-link)'}>
                        {
                            type === "song" ?
                                "We are putting your groove together. Hang in there!"
                                :
                                "We are drafting a song verse. Hang in there!"
                        }
                    </Typography>
                    <Typography className={styles.textMsg} color={'var(--wbl-font-link)'}>
                        Keep device active (Non sleep mode) for uninterrupted {
                            type === "song" ?
                                "song"
                                :
                                type === "lyrics" ?
                                    "lyrics"
                                    :
                                    "music"
                        } creation
                    </Typography>
                    {
                        generationTime && generationTime > 0 ?
                            <Typography
                                className={styles.textMsg}
                                color={'var(--wbl-font-link)'}
                            >
                                {
                                    type === 'lyrics' ?
                                        `${(generationTime / 1000).toFixed(2)} s`
                                        :
                                        `${convertMsToTime(generationTime, 'song')} min`
                                }
                            </Typography>
                            :
                            <></>
                    }
                    <Box>
                        <div className={styles.dotElastic}></div>
                    </Box>
                </Box>
                <Box className={styles.videoContainer}>
                    <video
                        id="background-video"
                        autoPlay={true}
                        loop={true}
                        muted={true}
                    >
                        <source
                            type="video/mp4"
                            src={require('../../assets/video/transition_video.mp4')}
                        />
                    </video>
                </Box>
            </Box>
        </Dialog>

    )
}

export default TransitionScreen
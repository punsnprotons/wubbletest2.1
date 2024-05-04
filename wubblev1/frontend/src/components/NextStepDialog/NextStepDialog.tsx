import React, { useEffect, useState } from 'react'
import { Box, Dialog, Typography } from '@mui/material'
import styles from './NextStepDialog.module.css'
import CustomButton from '../base/Button/CustomButton'
import NextIcon from '../icons/NextIcon'
import CloseIcon from '@mui/icons-material/Close'
import { useLocation, useNavigate } from 'react-router-dom'
import { getCurrentDimension } from '../../constants'

interface NextStepDialogProps {
    openNextStepDialog: boolean
    openOrCloseDialog: () => void
    afterNextStep: () => void
    currentPath: string
}

const paths = [
    {
        currPath: '/artist-selection',
        message1: 'Successfully added!',
        message2: 'Next',
        nextPath: [{
            title: 'Lyrics Creation',
            path: '/lyric-creation'
        }, {
            title: 'Song Creation',
            path: '/song-creation'
        }]
    }, {
        currPath: '/lyric-result',
        message1: 'Successfully added!',
        message2: 'Next',
        nextPath: [{
            title: 'Go To My Music',
            path: '/my-music'
        }, {
            title: 'Artist Selection',
            path: '/artist-selection'
        }, {
            title: 'Song Creation',
            path: '/song-creation'
        }]
    }, {
        currPath: '/song-result',
        message1: 'Successfully added!',
        message2: 'Next',
        nextPath: [{
            title: 'Artist Selection',
            path: '/artist-selection'
        }, {
            title: 'Lyrics Creation',
            path: '/lyric-creation'
        }]
    }
]

const NextStepDialog: React.FC<NextStepDialogProps> = ({
    openNextStepDialog, openOrCloseDialog, afterNextStep, currentPath
}) => {

    const { pathname } = useLocation()
    const navigate = useNavigate()

    const handleNavigate = async (path: string): Promise<void> => {

       afterNextStep()

        // if (res) {
        //     openOrCloseDialog()
        //     navigate(path)
        // }
        openOrCloseDialog()
        navigate(path)
    }

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
        <Dialog
            // open={true}
            open={openNextStepDialog}
            onClose={() => openOrCloseDialog()}
        >
            <Box className={styles.container}>
                <Box
                    className={styles.closeBtnContainer}
                    onClick={() => openOrCloseDialog()}
                >
                    <CloseIcon className={styles.closeBtn} />
                </Box>
                {
                    paths.map((path, index) => {
                        if(path.currPath === currentPath) {
                            return (
                                <Box
                                    key={index}
                                    className={styles.titleContainer}
                                >
                                    <Typography className={styles.title}>
                                        {path.message1}
                                    </Typography>
                                    <Typography className={styles.subTitle}>
                                        {path.message2}
                                    </Typography>
                                </Box>
                            )
                        }
                    })
                }
                <Box className={styles.btnContainer}>
                    {
                        paths.map((path) => {
                            if (path.currPath === currentPath) {
                                return (
                                    path.nextPath.map((item, index) => {
                                        return (
                                            <CustomButton
                                                key={index}
                                                className='btnPrimaryAction'
                                                sx={{
                                                    width: screenSize.width > 500 ? '246px' : '100%',
                                                    borderRadius: '25px !important',
                                                    display: 'flex !important',
                                                    justifyContent: 'space-between',
                                                    pl: '15px',
                                                    fontSize: { xs: '14px !important', sm: '16px !important' },
                                                }}
                                                onClick={() => handleNavigate(item.path)}
                                            >
                                                {item.title }
                                                <NextIcon />
                                            </CustomButton>
                                        )
                                    })
                                )
                            }
                        })
                    }

                </Box>
                

                <Typography
                    className={styles.cancelBtn}
                    onClick={() => openOrCloseDialog()}
                >
                    Cancel
                </Typography>
            </Box>
        </Dialog>
    )
}

export default NextStepDialog
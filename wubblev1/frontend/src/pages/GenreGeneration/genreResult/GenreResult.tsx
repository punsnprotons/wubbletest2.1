import { useEffect, useRef, useState } from "react";
import styles from './GenreResult.module.css'
import { Box, Typography } from '@mui/material'
import ActionButton from '../../../components/base/Button/actionButton/ActionButton'
import { CustomTextFieldSecondary } from '../../../components/base/TextField/CustomTextField'
import WaveSurfer from "wavesurfer.js";
import PlayIcon from "../../../components/icons/PlayIcon";
import PauseIcon from "../../../components/icons/PauseIcon";
import { useSaveGenreMutation } from "../../../api/genreGeneration/genreGenerationRest";
import Toast from "../../../components/base/Toast/Toast";
import { clearGenre } from "../../../redux/slices/genre/genreSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { useGetGenreUrlQuery } from "../../../api/genreGeneration/genreGenerationRest";
import NextStepDialog from "../../../components/NextStepDialog/NextStepDialog";
import { timeFormat, getCurrentDimension, convertMsToTime } from "../../../constants";
import ErrorDialog from "../../../components/NextStepDialog/ErrorDialog";

const GenreResult = (props: any) => {
    const ossFileName = props.genre.ossFileName
    const dispatch = useAppDispatch();

    const waveformRef = useRef<any>(null);
    const wavesurfer = useRef<any>(null);
    const [playing, setPlay] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(1);
    const [timePlaying, setTimePlaying] = useState<string>('00:00')
    const [duration, setDuration] = useState<string>('00:00')
    const [genreName, setGenreName] = useState<string>(props.genre.name)
    const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false)
    const [ossUrl, setOssUrl] = useState<string>('')

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

    const formWaveSurferOptions = (ref: any) => ({
        container: ref,
        waveColor: "#797979",
        progressColor: "#F8F8F8",
        barWidth: 3,
        barRadius: 3,
        responsive: true,
        height: screenSize.width > 768 ? 62 : 42,
        // If true, normalize by the maximum peak instead of 1.0.
        normalize: true,
        // Use the PeakCache to improve rendering speed of large waveforms.
        partialRender: true
    });

    // Toast state
    const [toast, setToast] = useState({
        message: "",
        type: "error",
        open: false,
        handleClose: () => {
            setToast((prev) => ({ ...prev, open: false }))
        }
    })

    // post
    const [saveGenre] = useSaveGenreMutation()

    // get
    const getGenreUrl = useGetGenreUrlQuery(ossFileName)
    useEffect(() => {
        if (!getGenreUrl.isLoading && getGenreUrl.data) {
            const data = getGenreUrl.data
            setOssUrl(data.url)
        }
    }, [getGenreUrl])

    useEffect(() => {
        if (ossUrl) {
            setPlay(false);

            const options = formWaveSurferOptions(waveformRef.current);
            wavesurfer.current = WaveSurfer.create(options);

            wavesurfer.current.load(ossUrl);

            wavesurfer.current.on("ready", function () {
                // make sure object stillavailable when file loaded
                if (wavesurfer.current) {
                    wavesurfer.current.setVolume(volume);
                    setVolume(volume);

                    const totalTime = wavesurfer.current.getDuration()
                    setDuration(timeFormat(totalTime))
                }
            });

            wavesurfer.current.on("audioprocess", function () {
                if (wavesurfer.current) {
                    const currentTime = wavesurfer.current.getCurrentTime()
                    setTimePlaying(timeFormat(parseInt(currentTime)))
                }
            })

            wavesurfer.current.on("finish", function () {
                setPlay(false);
            })

            // Removes events, elements and disconnects Web Audio nodes.
            // when component unmount
            return () => wavesurfer.current.destroy();
        }
    }, [ossUrl]);

    useEffect(() => {
        if (props.whichPlay !== props.idx && wavesurfer.current) {
            setPlay(false);
            wavesurfer.current.pause();
        }
    }, [props.whichPlay])

    const handlePlay = () => {
        props.setWhichPlay(props.idx)
        setPlay(!playing);
        wavesurfer.current.playPause();
    };

    const handlePause = () => {
        setPlay(!playing);
        wavesurfer.current.playPause();
    };

    // handle song name input
    const handleInputChange = (e: any): void => {
        const value = e.target.value

        if (value.length < 31) {
            setGenreName(value)
        }
    }

    const handleSaveGenre = async (): Promise<void> => {
        setIsSaveLoading(true)

        // let result = false

        try {

            if (genreName.length === 0) {
                throw new Error('Song or genre name cannot be empty.')
            }

            const saveData = { ...props.genre, name: genreName }

            const res = await saveGenre(saveData).unwrap()

            if (res) {

                // dispatch(clearGenre())
                // setIsSaveLoading(false)
                // result = true
                handleOpenCloseDialog()
                setIsSaveLoading(false)
            } else {
                setErrorMessage(res.error.data.message)
                handleOCErrorDialog()
                setIsSaveLoading(false)
            }
        } catch (e: any) {
            setIsSaveLoading(false)
            if (e.data) {
                setErrorMessage(e.data.message)
                handleOCErrorDialog()
            } else {
                setToast({
                    ...toast,
                    open: true,
                    message: e.message,
                    type: "error"
                })
            }
        }
    }

    const handleReGenerateGenre = async (): Promise<void> => {
        props.handleGenerateGenre('regenerate')
    }

    // next step dialog
    const [openNextStepDialog, setOpenNextStepDialog] = useState<boolean>(false)

    const handleOpenCloseDialog = (): void => {
        setOpenNextStepDialog(!openNextStepDialog)
    }

    const [errMessage, setErrorMessage] = useState<string>("")
    const [openFailedDialog, setOpenFailedDialog] = useState<boolean>(false)
    const handleOCErrorDialog = (): void => {
        setOpenFailedDialog(!openFailedDialog)
    }

    return (
        <>
            <Toast {...toast} />
            <NextStepDialog
                openNextStepDialog={openNextStepDialog}
                openOrCloseDialog={handleOpenCloseDialog}
                afterNextStep={() => dispatch(clearGenre())}
                currentPath='/song-result'
            />
            <ErrorDialog
                openFailedDialog={openFailedDialog}
                openOrCloseDialog={handleOCErrorDialog}
                errorMessage={errMessage}
            />
            {
                screenSize.width >= 768 &&
                <Box className={styles.genreResultComp}>
                    <Typography
                        className={styles.generateTime}
                        fontSize={16}
                        color={'var(--wbl-font-link)'}
                    >
                        {`Generated within ${convertMsToTime(props.genre.generationTime, 'song')} min`}
                    </Typography>
                    <Box className={styles.genreResult}>
                        <Box className={styles.playerPart}>
                            <Box className={styles.playerInfo}>
                                <Box
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '14px'
                                    }}
                                >
                                    {
                                        !playing ?
                                            <PlayIcon onClick={handlePlay} />
                                            :
                                            <PauseIcon onClick={handlePause} />
                                    }
                                    <Typography className={styles.playTime}>
                                        {
                                            `${timePlaying} / ${duration}`
                                        }
                                    </Typography>
                                </Box>
                                <Box>
                                    <CustomTextFieldSecondary
                                        placeholder='Example'
                                        sx={{
                                            width: '246.042px'
                                        }}
                                        value={genreName}
                                        onChange={handleInputChange}
                                    />
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    mt: '20px',
                                }}
                            >
                                <div
                                    className={`waveform-${props.idx}`}
                                    id={`waveform-${props.idx}`}
                                    ref={waveformRef}
                                />
                            </Box>
                        </Box>
                        <Box className={styles.actionPart}>
                            <ActionButton
                                disabled={isSaveLoading || props.isLoading}
                                btnAction='save'
                                sx={{
                                    width: '236px'
                                }}
                                onClick={handleSaveGenre}
                            >
                                Save
                            </ActionButton>
                            <ActionButton
                                disabled={isSaveLoading || props.isLoading}
                                btnAction='regen'
                                sx={{
                                    width: '236px'
                                }}
                                onClick={() => handleReGenerateGenre()}
                            >
                                Regenerate Song
                            </ActionButton>
                        </Box>
                    </Box>
                </Box>
            }
            {
                screenSize.width < 768 &&
                <Box className={styles.genreResultComp}>
                    <Typography
                        className={styles.generateTime}
                        color={'var(--wbl-font-link)'}
                    >
                        {`Generated within ${convertMsToTime(props.genre.generationTime, 'song')} min`}
                    </Typography>
                    <Box className={styles.genreResult}>
                        {/* player */}
                        <Box className={styles.playerInfo}>
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                {
                                    !playing ?
                                        <PlayIcon onClick={handlePlay} />
                                        :
                                        <PauseIcon onClick={handlePause} />
                                }
                                <Typography className={styles.playTime}>
                                    {
                                        `${timePlaying} / ${duration}`
                                    }
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                mt: '5px',
                                mb: '15px'
                            }}
                        >
                            <div
                                className={`waveform-${props.idx}`}
                                id={`waveform-${props.idx}`}
                                ref={waveformRef}
                            />
                        </Box>
                        {/* song name + save */}
                        <Box className={styles.titleSection}>
                            <Box
                                sx={{
                                    width: '100%'
                                }}
                            >
                                <CustomTextFieldSecondary
                                    placeholder='Example'
                                    sx={{
                                        width: '100%'
                                    }}
                                    value={genreName}
                                    onChange={handleInputChange}
                                />
                            </Box>
                        </Box>
                        {/* Regenerate button */}
                        <Box
                            sx={{
                                mt: '20px',
                                mb: '10px'
                            }}
                        >
                            <ActionButton
                                disabled={isSaveLoading || props.isLoading}
                                btnAction='save'
                                sx={{
                                    width: '100%',
                                }}
                                onClick={handleSaveGenre}
                            >
                                Save
                            </ActionButton>
                            <ActionButton
                                disabled={isSaveLoading || props.isLoading}
                                btnAction='regen'
                                sx={{
                                    width: '100%',
                                    marginTop: '20px'
                                }}
                                onClick={() => handleReGenerateGenre()}
                            >
                                Regenerate Genre
                            </ActionButton>
                        </Box>
                    </Box>
                </Box>
            }

        </>
    )
}

export default GenreResult
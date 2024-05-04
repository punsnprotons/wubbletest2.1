import React, { createRef, useState, useRef, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import styles from './SavedPage.module.css'
import ActionButton from '../../../components/base/Button/actionButton/ActionButton'
import { useGetGenreListQuery } from '../../../api/genreGeneration/genreGenerationRest'
import PlayIcon from '../../../components/icons/PlayIcon'
import PauseIcon from '../../../components/icons/PauseIcon'
import WaveSurfer from "wavesurfer.js";
import ItemsPart from './ItemsPart/ItemsPart'
import { useGetOssUrlMutation } from '../../../api/base/baseRest'
import CustomButton from '../../../components/base/Button/CustomButton'
import NextIcon from '../../../components/icons/NextIcon'
import CustomTooltip from '../../../components/base/Tooltip/Tooltip'
import DeleteConfirmationDialog from '../../../components/DeleteConfirmation/DeleteConfirmationDialog'
import { useDeleteGenreMutation } from '../../../api/genreGeneration/genreGenerationRest'
import Toast from '../../../components/base/Toast/Toast'
import { useDeleteLyricMutation } from '../../../api/lyric/lyricRest'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TransitionScreen from '../../../components/TransitionScreen/TransitionScreen'
import { getCurrentDimension } from '../../../constants'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const SavedPage = (props: any) => {

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
        height: screenSize.width > 768 ? 62 : 40,
        // If true, normalize by the maximum peak instead of 1.0.
        normalize: true,
        // Use the PeakCache to improve rendering speed of large waveforms.
        partialRender: true
    });

    // main player state
    let waveformRefs = useRef<any[]>([]);
    let wavesurfers = useRef<any[]>([]);
    const [playing, setPlay] = useState<boolean>(false);
    const [genreNameInMainPlayer, setGenreNameInMainPlayer] = useState<string>('')
    const [whichGenrePlayInMainPlayer, setWhichGenreInMainPlayer] = useState<any>({
        id: 0,
        name: '',
        wavsurferIdx: 0
    })
    const [isPaused, setIsPaused] = useState<boolean>(false)
    const [isDeleteActive, setIsDeleteActive] = useState<boolean>(false)
    const [genreList, setGenreList] = useState<any>([])
    const [getOssUrl] = useGetOssUrlMutation()
    const [selectedData, setSelectedData] = useState<{}>({
        genres: [],
        lyrics: []
    })
    const [isMainWaveSurferCollapse, setIsMainWaveSurferCollapse] = useState<boolean>(false)

    // Toast state
    const [toast, setToast] = useState({
        message: "",
        type: "error",
        open: false,
        handleClose: () => {
            setToast((prev) => ({ ...prev, open: false }))
        }
    })

    // GET
    // const getGenreList = useGetGenreListQuery(null, { refetchOnMountOrArgChange: true })
    const getGenreList = useGetGenreListQuery(null)
    useEffect(() => {

        if (!getGenreList.isLoading && getGenreList.data) {
            const data = getGenreList.data

            if (data.length > 0) {
                waveformRefs.current = data.map(
                    (ref: any, index: number) => waveformRefs.current[index] = createRef()
                )

                wavesurfers.current = data.map(
                    (ref: any, index: number) => wavesurfers.current[index] = createRef()
                )

                setGenreList(data)

                const lastIdx = data.length - 1

                setWhichGenreInMainPlayer({ id: data[lastIdx].id, name: data[lastIdx].name, wavesurferIdx: lastIdx })
                setGenreNameInMainPlayer(data[lastIdx].name)
            }
        }
    }, [getGenreList])

    // post
    const [deleteGenre] = useDeleteGenreMutation()
    const [deleteLyric] = useDeleteLyricMutation()

    const createWaveSurfer = async () => {
        setPlay(false);

        const sortedGenreItems = genreList.slice().sort((a: any, b: any): any => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        })

        if (sortedGenreItems.length > 0) {

            genreList.map(async (genre: any, idx: number) => {
                let oss = await getOssUrl({ ossFileName: genre.ossFileName }).unwrap()

                if (waveformRefs.current[idx].current.children.length > 0) {
                    waveformRefs.current[idx].current.removeChild(waveformRefs.current[idx].current.children[0])
                }

                const options = formWaveSurferOptions(waveformRefs.current[idx].current)
                wavesurfers.current[idx].current = WaveSurfer.create(options)

                wavesurfers.current[idx].current.load(oss.url)

                // Removes events, elements and disconnects Web Audio nodes.
                // when component unmount
                return () => wavesurfers.current[idx].current.destroy()
            })
        }
    }

    useEffect(() => {
        if (wavesurfers.current.length > 0 && waveformRefs.current.length > 0 && genreList.length > 0) {
            createWaveSurfer()
        }
        // }, [wavesurfers.current, waveformRefs.current, genreList]);
    }, [genreList]);

    const handlePlayPause = () => {
        setPlay(!playing);
        wavesurfers.current[whichGenrePlayInMainPlayer.wavesurferIdx].current.playPause();
    };

    const handleContinue = () => {
        wavesurfers.current[whichGenrePlayInMainPlayer.wavesurferIdx].current.play();
        setPlay(!playing);
        setIsPaused(!isPaused)
    }

    const handlePause = () => {
        wavesurfers.current[whichGenrePlayInMainPlayer.wavesurferIdx].current.pause();
        setPlay(!playing);
        setIsPaused(!isPaused)
    }

    const handleChangePlay = (genreData: any, idx: number, type: string) => {
        let index = idx

        if (type === 'changePlay') {
            index = (genreList.length - 1) - idx
        }

        wavesurfers.current[whichGenrePlayInMainPlayer.wavesurferIdx].current.stop();
        setPlay(false);
        setWhichGenreInMainPlayer({
            id: genreData.id,
            name: genreData.name,
            wavesurferIdx: index
        })
        setIsPaused(false)

        setTimeout(() => {
            setIsPaused(false)
            setPlay(true);
            wavesurfers.current[index].current.play();
        }, 100)

    }

    const handleNextPlay = (): void => {
        wavesurfers.current[whichGenrePlayInMainPlayer.wavesurferIdx].current.stop();
        const genreListLength = genreList.length - 1

        let nextGenrePlayIdx = 0

        if (whichGenrePlayInMainPlayer.wavesurferIdx === 0) {
            nextGenrePlayIdx = genreListLength
        } else {
            nextGenrePlayIdx = whichGenrePlayInMainPlayer.wavesurferIdx - 1
        }

        const genreDataPlayNext: any = genreList.filter((genre: any, idx: number) => idx === nextGenrePlayIdx)[0]

        handleChangePlay(genreDataPlayNext, nextGenrePlayIdx, 'nextPlay')
    }

    // handle delete confirmation
    const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState(false)
    const handleOpenDeleteConfirmationDialog = (): void => {
        setOpenDeleteConfirmationDialog(!openDeleteConfirmationDialog)
    }

    const handleDeleteSelected = async (): Promise<void> => {
        const deleteData: any = { ...selectedData }
        let isDeleteGenreSuccess = false
        let isDeleteLyricSuccess = false

        try {
            if (deleteData.genres.length > 0) {
                // do delete logic here
                const genreDeleteRes = await deleteGenre({ genres: deleteData.genres }).unwrap()

                if (genreDeleteRes) {
                    isDeleteGenreSuccess = true
                }
            }

            if (deleteData.lyrics.length > 0) {
                // do delete logic here
                const lyricDeleteRes = await deleteLyric({ lyrics: deleteData.lyrics }).unwrap()

                if (lyricDeleteRes) {
                    isDeleteLyricSuccess = true
                }
            }

            if (isDeleteGenreSuccess || isDeleteLyricSuccess) {
                setToast({
                    ...toast,
                    open: true,
                    message: "Successfully deleted items.",
                    type: "success"
                })
                handleOpenDeleteConfirmationDialog()

                // clear selectedData
                setSelectedData({
                    genres: [],
                    lyrics: []
                })
                // clear selected lyric and genre also in items part component
            }
        } catch (e: any) {
            if (e.data) {
                setToast({
                    ...toast,
                    open: true,
                    message: e.data.message,
                    type: "error"
                })
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

    // transition merge part
    const [openTransitionScreen, setOpenTransitionScreen] = useState<boolean>(false)

    const handleMergeBtn = (): void => {
        setOpenTransitionScreen(true)
    }

    const handleCollapseMainWaveSurfer = (): void => {
        setIsMainWaveSurferCollapse(!isMainWaveSurferCollapse)
    }

    return (
        <>
            <Toast {...toast} />
            <TransitionScreen
                type='merge'
                openTransitionScreen={openTransitionScreen}
                setOpenTransitionScreen={setOpenTransitionScreen}
                setValue={props.setValue}
            />
            <Box
                sx={{
                    position: 'relative'
                }}
            >
                <DeleteConfirmationDialog
                    deleteAction={() => handleDeleteSelected()}
                    openDeleteConfirmationDialog={openDeleteConfirmationDialog}
                    openOrCloseDeleteConfirmationDialog={handleOpenDeleteConfirmationDialog}
                    message={"This selected item can no longer be retrieved once deleted."}
                />
                <Box className={styles.topActionBtn}>
                    <ActionButton
                        disabled={genreList.length === 0 ? true : false}
                        btnAction='nextSample'
                        sx={{
                            width: '236px'
                        }}
                        onClick={() => handleNextPlay()}
                    >
                        Next Song
                    </ActionButton>
                    <Box className={styles.deleteAndMerge}>
                        <CustomButton
                            disabled={isDeleteActive === false ? true : false}
                            className='btnPrimaryAction'
                            sx={{
                                width: '155px',
                                background: 'rgba(251, 192, 19, 0.20) !important',
                                borderRadius: '25px !important'
                            }}
                            onClick={() => handleOpenDeleteConfirmationDialog()}
                        >
                            Delete Selected
                        </CustomButton>
                        <Box className={styles.mergeParts}>
                            <CustomTooltip
                                type="normalTooltip"
                                message="Parts merged will create a 30 second Music Trainer clip; which then can be used as is, or to generate a longer song."
                            >
                                <HelpOutlineIcon
                                    sx={{
                                        height: '20px',
                                        width: '20px',
                                        color: 'var(--wbl-font-primary)'
                                    }}
                                />
                            </CustomTooltip>
                            <CustomButton
                                disabled={isDeleteActive === false ? true : false}
                                className='btnPrimaryAction'
                                sx={{
                                    width: '246px',
                                    borderRadius: '25px !important',
                                    display: 'flex !important',
                                    justifyContent: 'space-between',
                                    pl: '15px',
                                    fontSize: { xs: '12px !important', sm: '16px !important' }
                                }}
                                onClick={() => handleMergeBtn()}
                            >
                                Merge Parts
                                <NextIcon
                                    color={isDeleteActive ? 'inherit' : '#BB756C'}
                                />
                            </CustomButton>
                        </Box>
                    </Box>
                </Box>
                <Box className={styles.mainPlayer}>
                    <Box className={styles.mainPlayerInfo}>
                        {
                            !playing ?
                                <PlayIcon
                                    disabled={true}
                                    id="playBtn"
                                    color={genreList.length === 0 ? 'var(--wbl-font-secondary)' : ''}
                                    onClick={() => {
                                        if (genreList.length > 0) {
                                            handlePlayPause()
                                        }
                                    }}
                                />
                                :
                                <PauseIcon id="pauseBtn" onClick={handlePause} />
                        }
                        <Typography
                            fontSize={16}
                            color={'var(--wbl-font-primary)'}
                        >
                            {whichGenrePlayInMainPlayer.name}
                        </Typography>
                        <Box className={styles.collapseWaveSurfer}>
                            {
                                !isMainWaveSurferCollapse ?
                                    <KeyboardArrowUpIcon
                                        className={styles.collapseIcon}
                                        onClick={() => handleCollapseMainWaveSurfer()}
                                    />
                                    :
                                    <KeyboardArrowDownIcon
                                        className={styles.collapseIcon}
                                        onClick={() => handleCollapseMainWaveSurfer()}
                                    />
                            }
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            height: isMainWaveSurferCollapse ? '0px' : 'fit-content',
                            overflow: 'hidden'
                        }}
                    >
                        {
                            genreList.map((genre: any, idx: number) => {
                                return (
                                    <div
                                        style={{
                                            display: whichGenrePlayInMainPlayer.id === genre.id ? '' : 'none'
                                        }}
                                        key={idx}
                                        id={`waveform-${idx}`}
                                        ref={waveformRefs.current[idx]}
                                    />
                                )
                            })
                        }
                    </Box>
                    <Box
                        className={styles.actionBtnMobileContainer}
                    >
                        <ActionButton
                            disabled={genreList.length === 0 ? true : false}
                            btnAction='nextSample'
                            sx={{
                                width: '100%'
                            }}
                            onClick={() => handleNextPlay()}
                        >
                            Next Song
                        </ActionButton>
                    </Box>
                </Box>
                <Box className={styles.deleteBtnMobile}>
                    <CustomButton
                        disabled={isDeleteActive === false ? true : false}
                        className='btnPrimaryAction'
                        sx={{
                            width: screenSize.width > 330 ? '48%' : '140px',
                            background: 'rgba(251, 192, 19, 0.20) !important',
                            borderRadius: '25px !important'
                        }}
                        onClick={() => handleOpenDeleteConfirmationDialog()}
                    >
                        Delete Selected
                    </CustomButton>
                    <CustomButton
                        disabled={isDeleteActive === false ? true : false}
                        className='btnPrimaryAction'
                        sx={{
                            width: screenSize.width > 330 ? '48%' : '140px',
                            borderRadius: '25px !important',
                            display: 'flex !important',
                            justifyContent: 'space-between',
                            pl: '15px',
                            fontSize: { xs: '12px !important', sm: '16px !important' }
                        }}
                        onClick={() => handleMergeBtn()}
                    >
                        Merge Parts
                        <NextIcon
                            color={isDeleteActive ? 'inherit' : '#BB756C'}
                        />
                    </CustomButton>
                </Box>
                <Box className={styles.itemsPart}>
                    <ItemsPart
                        whichGenrePlayInMainPlayer={whichGenrePlayInMainPlayer}
                        playing={playing}
                        handleChangePlay={handleChangePlay}
                        handleContinue={handleContinue}
                        handlePause={handlePause}
                        isPaused={isPaused}
                        setIsPaused={setIsPaused}
                        isDeleteActive={isDeleteActive}
                        setIsDeleteActive={setIsDeleteActive}
                        setSelectedData={setSelectedData}
                        selectedData={selectedData}
                    />
                </Box>
            </Box>
        </>
    )
}

export default SavedPage
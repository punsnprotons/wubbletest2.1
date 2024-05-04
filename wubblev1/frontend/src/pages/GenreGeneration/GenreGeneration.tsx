/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from 'react';
import { Box, InputLabel, Typography } from '@mui/material'
import styles from './GenreGeneration.module.css'
import CustomTextFieldPrimary from '../../components/base/TextField/CustomTextField';
import { debounce, validateVibe, getCurrentDimension, getLatestTitle } from '../../constants';
import CustomButton from '../../components/base/Button/CustomButton';
import FeelingLuckyBtn from '../../components/base/Button/FeelingLuckyBtn/FeelingLuckyBtn';
import DragAndDropAudio from '../../components/DragAndDrop/DragAndDropAudio';
import { useGenerateGenreMutation } from '../../api/genreGeneration/genreGenerationRest';
import Toast from '../../components/base/Toast/Toast';
import { getGenreState } from '../../redux/slices/genre/genreSlice';
import { useAppSelector } from '../../redux/hooks';
import { setGenre, setGenerateInput, clearGenre } from '../../redux/slices/genre/genreSlice';
import { useAppDispatch } from '../../redux/hooks';
import GenreResult from './genreResult/GenreResult';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomTooltip from '../../components/base/Tooltip/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useGetGenreListQuery } from '../../api/genreGeneration/genreGenerationRest';
import TransitionScreen from '../../components/TransitionScreen/TransitionScreen';

const GenreGeneration = () => {

    const genreState: any = useAppSelector(getGenreState)
    const { genre, generateInput } = genreState
    const dispatch = useAppDispatch()
    const { pathname } = useLocation()
    const navigate = useNavigate()


    const [whichPlay, setWhichPlay] = useState<any>(999);
    const getGenreList = useGetGenreListQuery(null)
    const [genreName, setGenreName] = useState<any>('')

    useEffect(() => {
        if (genre.length === 0) {
            navigate('/song-creation')
        }
    }, [])

    const inputRef = useRef<HTMLInputElement>(null);
    const resetFileInput = () => {
        // 👇️ reset input value
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [vibe, setVibe] = useState<string>('')
    const [vibeCount, setVibeCount] = useState<number>(0)
    const [errors, setErrors] = useState<any>({
        vibe: {
            isError: false,
            errMsg: ''
        },
        file: {
            isError: false,
            errMsg: ''
        },
    })
    const [file, setFile] = useState<any>(null)
    const [fileName, setFileName] = useState<string>('')

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
    const [generateGenre] = useGenerateGenreMutation()

    // validate single field
    const validateSingleField = (obj: { key: string, value: string }) => {
        const { key, value } = obj
        let validate: any

        if (key === 'vibe') {
            validate = validateVibe(value)
            setErrors((prev: any) => ({ ...prev, [key]: validate }))
        }
    }

    // debounce handler
    const debounceHandler = useCallback(
        debounce(validateSingleField)
        , []);

    // vibe input handler
    const handleInputChange = (e: any): void => {
        const key = e.target.name
        const value = e.target.value

        if (value.length <= 201) {
            setVibe(value)
            setVibeCount(value.length)
        }

        debounceHandler({ key, value })
    }

    // clear input data
    const clearInputData = (): void => {
        setVibe('')
        setFile('')
        setFileName('')
        setVibeCount(0)
        resetFileInput()
    }

    const getCurrentGenreDefaultName = (): string => {

        if (genreState.genre.length === 0) {
            return genreName
        } else {
            let count = 0
            count = genreState.genre.length

            // get current latest
            const currentCount = +genreName.split('-')[2]
            count = +currentCount + count
            return `songname-song-${count}`
        }
    }

    // Timer start
    const [miliSeconds, setMiliSeconds] = useState(0)
    const [isRunning, setIsRunning] = useState(false)

    useEffect(() => {
        var timer: any;

        if (isRunning) {
            const timeNow = new Date().getTime()

            timer = setInterval(() => {
                const timeCountInMs = new Date().getTime() - timeNow
                setMiliSeconds(timeCountInMs)
            }, 1)

            return () => clearInterval(timer);
        } else {
            clearInterval(timer);
        }
    }, [isRunning])

    const startTimer = () => {
        setIsRunning(true)
        setMiliSeconds(0)
    }

    const restartTimer = () => {
        setIsRunning(false)
        setMiliSeconds(0)
    }

    const stopTimer = () => {
        setIsRunning(false)
    }
    // Timer end

    // generate genre event
    const handleGenerateGenre = async (type: string): Promise<void> => {
        if (genre.length === 3 && type === 'regenerate') {
            handleStartOver()
            setIsLoading(false)
            return
        }

        setIsLoading(true)

        try {
            if (vibe === '' && !file && type !== 'regenerate' && type !== 'feelingLucky') {
                throw new Error('Write a vibe or upload an audio file first.')
            }

            const formData = new FormData()
            let generateData = {
                prompt: vibe,
            }

            if (type === 'feelingLucky') {
                generateData = {
                    prompt: 'I am feeling lucky today'
                }
            } else if (type === 'regenerate') {
                generateData = {
                    prompt: generateInput.prompt
                }

                if (generateInput.file) {
                    formData.append("file", generateInput.file)
                }
            } else {
                formData.append("file", file)
            }

            formData.append("body", JSON.stringify(generateData))

            if (type !== 'regenerate') {
                dispatch(clearGenre())
                setGenreName('')
            }

            startTimer()
            const generationTimeStart = new Date().getTime()
            const res = await generateGenre(formData).unwrap()
            const generationTimeEnd = new Date().getTime()

            if (res) {
                // check if 
                stopTimer()
                if (type === 'regenerate') {
                    dispatch(setGenerateInput({
                        prompt: generateInput.prompt,
                        file: generateInput.file
                    }))
                    setToast({
                        ...toast,
                        open: true,
                        message: 'Successfully regenerated a genre.',
                        type: "success"
                    })

                    let genreDefaultName = getCurrentGenreDefaultName()
                    const generationTimeResult = generationTimeEnd - generationTimeStart
                    let payload = {
                        result: res.result,
                        name: genreDefaultName,
                        generationTime: generationTimeResult
                    }

                    dispatch(setGenre(payload))
                    getGenreList.refetch()
                } else {
                    setToast({
                        ...toast,
                        open: true,
                        message: 'Successfully generated a genre.',
                        type: "success"
                    })

                    const generationTimeResult = generationTimeEnd - generationTimeStart
                    let payload = {
                        result: res.result,
                        name: genreName,
                        generationTime: generationTimeResult
                    }

                    setTimeout(() => {
                        getGenreList.refetch()
                        dispatch(setGenre(payload))
                        dispatch(setGenerateInput({
                            prompt: vibe,
                            file: file
                        }))
                    }, 200)

                    setTimeout(() => {
                        clearInputData()
                    }, 1000)

                    navigate('/song-creation/result', { replace: true })
                }
                setIsLoading(false)
            }
        } catch (e: any) {
            stopTimer()
            setIsLoading(false)
            if (e.data) {
                setToast({
                    ...toast,
                    open: true,
                    message: 'Something went wrong. Please try again.',
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

    // handle start over
    const handleStartOver = () => {
        restartTimer()
        dispatch(clearGenre())
        navigate('/song-creation', { replace: true })
    }

    // get genre lists
    useEffect(() => {
        if (getGenreList.data) {
            const latestTitle = getLatestTitle(getGenreList.data, 'song')
            setGenreName(latestTitle)
        }
    }, [getGenreList])

    return (
        <>
            <Toast {...toast} />
            <TransitionScreen
                type='song'
                openTransitionScreen={isLoading}
                setOpenTransitionScreen={setIsLoading}
                generationTime={miliSeconds}
            />
            <Box
                className={`${styles.genreGeneration}`}
            >
                <Box
                    className={
                        (pathname === '/song-creation' || pathname === '/song-creation/') ?
                            styles.genreContainer
                            :
                            styles.genreResultContainer
                    }
                >
                    {
                        pathname.includes('/song-creation/result') &&
                        <Typography
                            fontSize={16}
                            color={'var(--wbl-font-link)'}
                            sx={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                my: '10px'
                            }}
                            onClick={() => handleStartOver()}
                        >
                            <ArrowBackIosNewIcon
                                sx={{
                                    fontSize: '18px',
                                    mb: '3px'
                                }}
                            />
                            <span>
                                Start Over
                            </span>
                        </Typography>
                    }
                    <Box
                        className={styles.titleContainer}
                    >
                        <Typography
                            color={'var(--wbl-font-primary)'}
                            fontSize={20}
                        >
                            Song Creator
                        </Typography>
                        {
                            pathname === '/song-creation' &&
                            <Typography
                                fontSize={16}
                                color={'var(--wbl-font-link)'}
                                sx={{
                                    textDecoration: 'underline',
                                    cursor: 'pointer'
                                }}
                                onClick={() => navigate('/artist-selection')}
                            >
                                Skip
                            </Typography>
                        }
                    </Box>
                    {
                        (pathname === '/song-creation' || pathname === '/song-creation/') &&
                        <>
                            <Box
                                className={styles.genreForm}
                            >
                                <Box
                                    className={styles.genreInput}
                                >
                                    <InputLabel
                                        className={styles.InputLabel}
                                    >
                                        Vibe
                                        <span>
                                            <CustomTooltip
                                                type='normalTooltip'
                                                message="What would you like your song to be about?"
                                            >
                                                <HelpOutlineIcon
                                                    sx={{
                                                        height: '18px',
                                                        width: '18px',
                                                    }}
                                                />
                                            </CustomTooltip>
                                        </span>
                                    </InputLabel>
                                    <Box
                                        sx={{
                                            position: 'relative'
                                        }}
                                    >
                                        <CustomTextFieldPrimary
                                            id='vibe'
                                            name='vibe'
                                            type='vibe'
                                            placeholder='e.g. running on the beach'
                                            size='small'
                                            multiline
                                            rows={6}
                                            value={vibe}
                                            onChange={(e) => handleInputChange(e)}
                                            sx={{
                                                width: '100%',
                                            }}
                                        />
                                        <Typography
                                            className={styles.vibeCounter}
                                            sx={{
                                                display: errors.vibe.isError ? 'flex' : 'inherit',
                                                justifyContent: 'space-between',
                                                textAlign: errors.vibe.isError ? 'normal' : 'end'
                                            }}
                                        >
                                            {
                                                errors.vibe.isError &&
                                                <span
                                                    style={{
                                                        width: '50%',
                                                        color: 'var(--wbl-error)'
                                                    }}
                                                >
                                                    {errors.vibe.errMsg}
                                                </span>
                                            }
                                            <span
                                                style={{
                                                    color: errors.vibe.isError ? 'var(--wbl-error)' : '',
                                                }}
                                            >
                                                {`${vibeCount} `}
                                                / 200
                                            </span>
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box
                                    className={styles.genreInput}
                                >
                                    <InputLabel
                                        className={styles.InputLabel}
                                    >
                                        Add Your Music
                                        <span>
                                            <CustomTooltip
                                                message="Optional"
                                                type="normalTooltip"
                                            >
                                                <HelpOutlineIcon
                                                    sx={{
                                                        height: '18px',
                                                        width: '18px',
                                                    }}
                                                />
                                            </CustomTooltip>
                                        </span>
                                    </InputLabel>
                                    <DragAndDropAudio
                                        label='audioFile'
                                        file={file}
                                        setFile={setFile}
                                        fileName={fileName}
                                        setFileName={setFileName}
                                        inputRef={inputRef}
                                        resetFileInput={resetFileInput}
                                    />
                                </Box>
                            </Box>
                            <Box
                                className={styles.actionButtons}
                            >
                                <Typography
                                    fontSize={16}
                                    color={'var(--wbl-font-link)'}
                                    sx={{
                                        textDecoration: 'underline',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => clearInputData()}
                                >
                                    Start Over
                                </Typography>
                                <Box
                                    className={styles.buttons}
                                >
                                    <CustomButton
                                        disabled={isLoading}
                                        className='btnPrimaryAction'
                                        sx={{
                                            width: screenSize.width <= 450 ? '80%' : '246px',
                                            borderRadius: '25px !important',
                                            display: 'flex !important',
                                            justifyContent: 'space-between',
                                            pl: '15px',
                                            fontSize: { xs: '14px !important', sm: '16px !important' }
                                        }}
                                        onClick={() => handleGenerateGenre('generate')}
                                    >
                                        Create Song
                                    </CustomButton>
                                    {
                                        screenSize.width > 450 ?
                                            <CustomTooltip
                                                type='normalTooltip'
                                                message="Feeling Adventurous? Try your luck with the randomize button and let serendipity guide your way!"
                                            >
                                                <Box>
                                                    <FeelingLuckyBtn
                                                        disabled={isLoading}
                                                        sx={{
                                                            width: screenSize.width <= 450 ? '90vw' : '246px',
                                                            borderRadius: '25px !important',
                                                            fontSize: { xs: '14px !important', sm: '16px !important' }
                                                        }}
                                                        onClick={() => handleGenerateGenre('feelingLucky')}
                                                    />
                                                </Box>
                                            </CustomTooltip>
                                            :
                                            <Box className={styles.luckyContainer}>

                                                <Box sx={{
                                                    width: '100%',
                                                    display: 'flex',
                                                }}>
                                                    <FeelingLuckyBtn
                                                        disabled={isLoading}
                                                        sx={{
                                                            width: '100%',
                                                            borderRadius: '25px !important',
                                                            fontSize: { xs: '14px !important', sm: '16px !important' },
                                                        }}
                                                        onClick={() => handleGenerateGenre('feelingLucky')}
                                                    />
                                                </Box>

                                                <Box
                                                    className={styles.tooltipIcon}
                                                >
                                                    <CustomTooltip
                                                        type='btnTooltip'
                                                        message="Feeling Adventurous? Try your luck with the randomize button and let serendipity guide your way!"
                                                    >
                                                        <HelpOutlineIcon
                                                            sx={{
                                                                height: '30px',
                                                                width: '30px',
                                                                alignSelf: 'center',
                                                                color: 'var(--wbl-font-primary)',
                                                            }}
                                                        />
                                                    </CustomTooltip>
                                                </Box>
                                            </Box>
                                    }
                                </Box>
                            </Box>
                        </>
                    }
                    <Box className={styles.contentContainer}>
                        {
                            pathname === '/song-creation/result' &&
                            genre.length > 0 &&
                            genre.map((item: any, idx: number) => {
                                return (
                                    <GenreResult
                                        key={idx}
                                        idx={idx}
                                        isLoading={isLoading}
                                        clearInputData={clearInputData}
                                        setGenre={setGenre}
                                        generateInput={generateInput}
                                        genre={item}
                                        dispatch={dispatch}
                                        handleGenerateGenre={handleGenerateGenre}
                                        whichPlay={whichPlay}
                                        setWhichPlay={setWhichPlay}
                                        getGenreList={getGenreList}
                                    />
                                )
                            })
                        }
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default GenreGeneration
import { useEffect, useState, useCallback, useRef } from 'react'
import { Box, InputLabel, Typography } from '@mui/material'
import CustomButton from '../../components/base/Button/CustomButton'
import styles from './Creation.module.css'
import { debounce, validateLyricPrompt, getCurrentDimension, getLatestTitle } from '../../constants'
import { useNavigate, useLocation } from 'react-router-dom'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CustomTextFieldPrimary from '../../components/base/TextField/CustomTextField'
import { useGenerateLyricMutation, useGetToneQuery, useGetLyricListQuery } from '../../api/lyric/lyricRest'
import FeelingLuckyBtn from '../../components/base/Button/FeelingLuckyBtn/FeelingLuckyBtn';
import Toast from '../../components/base/Toast/Toast';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { setLyric, setLyricInput, removeLyric } from '../../redux/slices/lyric/lyricSlice'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CustomTooltip from '../../components/base/Tooltip/Tooltip';
import GeneratedLyric from './GeneratedLyric'
import { CustomSelectTertiary } from '../../components/base/Select/CustomSelect';
import TransitionScreen from '../../components/TransitionScreen/TransitionScreen';

const Creation = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // redux state
  const lyricState: any = useAppSelector((state: any) => state.lyric)

  const { lyric } = lyricState
  // redux set state
  const dispatch: any = useAppDispatch()

  // post api
  const [generateLyric] = useGenerateLyricMutation()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [prompt, setPrompt] = useState<string>('')
  const [promptCount, setPromptCount] = useState<number>(0)
  const getToneList = useGetToneQuery(null)
  const [toneList, setToneList] = useState<any[]>([])
  const [regenerateLoading, setRegenerateLoading] = useState<boolean>(false)
  const getLyricList = useGetLyricListQuery(null)

  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const [lyricName, setLyricName] = useState<any>('')
  const [isTypeLucky, setIsTypeLucky] = useState<boolean>(false)

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension())
    }
    window.addEventListener('resize', updateDimension);

    return (() => {
      window.removeEventListener('resize', updateDimension);
    })
  }, [screenSize])

  const [tone, setTone] = useState<any>({
    id: '6058207530f7b1000c1c4f86',
    name: 'Appreciative'
  })

  const [errors, setErrors] = useState<any>({
    prompt: {
      isError: false,
      errMsg: ''
    },
    tone: {
      isError: false,
      errMsg: ''
    },
  })

  const [toast, setToast] = useState({
    message: "",
    type: "error",
    open: false,
    handleClose: () => {
      setToast((prev) => ({ ...prev, open: false }))
    }
  })

  useEffect(() => {
    if (getToneList.data) {
      let toneArray = getToneList.data.map((item: any, index: number) => {
        return {
          id: item._id,
          // _id: item._id,
          name: item.name
        }
      })
      setToneList(toneArray)
    }
  }, [getToneList])

  // get current latest lyric name in db and update to redux state 
  useEffect(() => {
    if (!getLyricList.isLoading && getLyricList.data) {
      const latestTitle = getLatestTitle(getLyricList.data, 'lyric')
      setLyricName(latestTitle)
    }
  }, [getLyricList])

  const validateSingleField = (obj: { key: string, value: string }) => {
    const { key, value } = obj
    let validate: any

    if (key === 'prompt') {
      validate = validateLyricPrompt(value)
      setErrors((prev: any) => ({ ...prev, [key]: validate }))
    }
  }

  const debounceHandler = useCallback(
    debounce(validateSingleField)
    , []);

  const handleInputChange = (e: any): void => {
    const key = e.target.name
    const value = e.target.value

    if (value.length <= 201) {
      setPrompt(value)
      setPromptCount(value.length)
    }

    debounceHandler({ key, value })
  }

  const clearPrompt = (): void => {
    setTone(toneList[0])
    setPrompt('')
    setPromptCount(0)
  }

  const handleSelectChange = (e: any) => {
    setTone(toneList.filter((option) => option.id === e.target.value)[0])
  }

  const getTone = (data: any) => {
    return toneList.filter((option) => option.id === data.id)[0].id
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

  const handleGenerateLyric = async (type: string): Promise<void> => {
    try {
      setIsLoading(true)
      setRegenerateLoading(true)

      if (prompt === '' && type !== 'regenerate' && type !== 'feelingLucky') {
        throw new Error('Please describe what you want your lyrics to be about.')
      }

      let userPrompt
      if (type === 'feelingLucky') {
        userPrompt = 'I am feeling lucky today'
        setIsTypeLucky(true)
      } else {
        userPrompt = prompt
        setIsTypeLucky(false)
      }

      let generateData = {
        prompt: userPrompt,
        tone: getTone(tone)
      }

      startTimer()
      const timeStart = new Date().getTime()
      const res: any = await generateLyric(generateData)
      const timeEnd = new Date().getTime()

      if (res) {
        stopTimer()
        // clear local storage first
        dispatch(removeLyric(lyric[0]))
        // save input lyric
        dispatch(setLyricInput({
          prompt: userPrompt,
          tone: getTone(tone)
        }))

        // save lyric result
        const timeResult = timeEnd - timeStart
        dispatch(setLyric({
          lyrics: res.data[0],
          generationTime: timeResult
        }))
        setIsLoading(false)
        setRegenerateLoading(false)
        navigate('/lyric-creation/result')
      }
      if (!res.data) {
        stopTimer()
        setIsLoading(false)
        setRegenerateLoading(false)
        setToast({
          ...toast,
          open: true,
          message: 'Something went wrong. Please try again.',
          type: "error"
        })
      }
      setIsLoading(false)
      setRegenerateLoading(false)
    } catch (e: any) {
      stopTimer()
      setIsLoading(false)
      setRegenerateLoading(false)
      if (e.data) {
        setToast({
          ...toast,
          open: true,
          // message: e.data.message,
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

  const handleStartOver = () => {
    restartTimer()
    setTone(toneList[0])
    setPrompt('')
    navigate('/lyric-creation', { replace: true })
  }

  useEffect(() => {
  }, [tone])

  console.log('toneList:', toneList)

  return (
    <>
      <Toast {...toast} />
      <TransitionScreen
        type='lyrics'
        openTransitionScreen={isLoading}
        setOpenTransitionScreen={setIsLoading}
        generationTime={miliSeconds}
      />
      <Box className={`${styles.creationPage} bg-2`}>
        <Box className={pathname === '/lyric-creation' ? styles.creationContainer : styles.resultContainer}>
          <Box className={styles.flexBetween}>
            {
              pathname === '/lyric-creation/result' &&
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
            <Typography color={'var(--wbl-font-primary)'} fontSize={'20px'}>Lyrics Creation</Typography>
            {
              pathname === '/lyric-creation' &&
              <>
                <Box className={styles.lyricForm}>
                  <Box className={styles.lyricInput}>
                    <InputLabel className={styles.InputLabel}>
                      Tone
                      <span>
                        <CustomTooltip
                          type='normalTooltip'
                          message="Generate a song lyric based on context/ conditions given"
                        >
                          <HelpOutlineIcon
                            sx={{
                              height: '18px',
                              width: '18px',
                              marginTop: '5px',
                            }}
                          />
                        </CustomTooltip>
                      </span>
                    </InputLabel>
                    {
                      toneList && toneList.length > 0 &&
                      <CustomSelectTertiary
                        selected={tone}
                        value={tone.id}
                        placeholder='Tone'
                        styles={{
                          width: '100%'
                        }}
                        selectlabel='Tone'
                        options={toneList}
                        onChange={e => handleSelectChange(e)}
                      />
                    }
                  </Box>
                  <Box className={styles.lyricInput}>
                    <InputLabel className={styles.InputLabel}>
                      What do you want your lyrics to be about
                      {/* <span>
                        <CustomTooltip
                          type='normalTooltip'
                          message="What do you want your lyrics to be about."
                        >
                          <HelpOutlineIcon
                            sx={{
                              height: '18px',
                              width: '18px',
                              marginTop: '5px',
                            }}
                          />
                        </CustomTooltip>
                      </span> */}
                    </InputLabel>
                    <Box
                      sx={{
                        position: 'relative'
                      }}
                    >
                      <CustomTextFieldPrimary
                        name='prompt'
                        value={prompt}
                        sx={{ width: '100%' }}
                        size='small' multiline rows={6}
                        placeholder='eg. something about love'
                        onChange={e => handleInputChange(e)}
                      // helperText={
                      //   errors.prompt.isError ? errors.prompt.errMsg : ''
                      // }
                      />
                      <Typography className={styles.promptCounter}
                        sx={{
                          display: errors.prompt.isError ? 'flex' : 'inherit',
                          justifyContent: 'space-between',
                          textAlign: errors.prompt.isError ? 'normal' : 'end'
                        }}
                      >
                        {
                          errors.prompt.isError &&
                          <span
                            style={{
                              width: '50%',
                              color: 'var(--wbl-error)'
                            }}
                          >
                            {errors.prompt.errMsg}
                          </span>
                        }
                        <span
                          style={{
                            color: errors.prompt.isError ? 'var(--wbl-error)' : ''
                          }}
                        >
                          {`${promptCount} `}
                          / 200
                        </span>
                      </Typography>
                    </Box>

                  </Box>

                  <>
                    <Typography className={styles.startOver} onClick={clearPrompt}>
                      Start Over
                    </Typography>
                    <Box className={styles.actionButtons}>
                      <CustomButton
                        disabled={isLoading}
                        className={`btnPrimaryAction`}
                        sx={{
                          width: screenSize.width > 450 ? '246px' : '80%',
                          borderRadius: '25px !important',
                          display: 'flex !important',
                          justifyContent: 'space-between',
                          pl: '15px',
                          fontSize: { sm: '16px !important' }
                        }}
                        onClick={() => handleGenerateLyric('prompt')}
                      >
                        Generate Lyrics
                      </CustomButton>
                      {
                        screenSize.width > 450 ?
                          <CustomTooltip
                            type='normalTooltip'
                            message="Feeling Adventurous? Try your luck with the randomize button and let serendipity guide your way!">
                            <Box sx={{
                              width: screenSize.width > 450 ? '246px' : '100%',
                              display: 'flex',
                            }}>
                              <FeelingLuckyBtn
                                disabled={isLoading}
                                sx={{
                                  width: screenSize.width > 450 ? '246px' : '100%',
                                  borderRadius: '25px !important',
                                  fontSize: { sm: '16px !important' }
                                }}
                                onClick={() => handleGenerateLyric('feelingLucky')}
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
                                  fontSize: { sm: '16px !important' }
                                }}
                                onClick={() => handleGenerateLyric('feelingLucky')}
                              />

                            </Box>
                            <Box
                              className={styles.tooltipIcon}
                            >
                              <CustomTooltip
                                type='btnTooltip'
                                message="Feeling Adventurous? Try your luck with the randomize button and let serendipity guide your way!">
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
                  </>
                </Box> { /* lyric form */}
              </>
            }

            {
              pathname === '/lyric-creation/result' && lyric.length > 0 &&
              lyric.map((item: any, idx: number) => {
                return (
                  <GeneratedLyric
                    key={idx}
                    lyric={item}
                    lyricName={lyricName}
                    regenerate={handleGenerateLyric}
                    regenerateLoading={regenerateLoading}
                    getLyricList={getLyricList}
                    isTypeLucky={isTypeLucky}
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

export default Creation
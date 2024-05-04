import { useEffect, useState } from 'react'
import { Box, Typography, Card } from '@mui/material'
import styles from './GeneratedLyric.module.css'
import ActionButton from '../../components/base/Button/actionButton/ActionButton'
import { CustomTextFieldSecondary } from '../../components/base/TextField/CustomTextField'
import { useSaveLyricMutation } from '../../api/lyric/lyricRest'
import Toast from '../../components/base/Toast/Toast'
import NextStepDialog from '../../components/NextStepDialog/NextStepDialog'
import { useAppDispatch } from '../../redux/hooks'
import { clearLyric } from '../../redux/slices/lyric/lyricSlice'
import { getCurrentDimension } from '../../constants'
import ErrorDialog from '../../components/NextStepDialog/ErrorDialog'

const GeneratedLyric = (props: any) => {
  const dispatch = useAppDispatch();
  const [lyricName, setLyricName] = useState<string>('')
  const [sections, setSections] = useState<any>(null)
  const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false)

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
  const [saveLyric] = useSaveLyricMutation()

  const [toast, setToast] = useState({
    message: "",
    type: "error",
    open: false,
    handleClose: () => {
      setToast((prev) => ({ ...prev, open: false }))
    }
  })

  useEffect(() => {
    let lyrics = props.lyric.ryte.split(/<p>(.*?)<\/p>/).filter(Boolean)
    setSections(lyrics)
  }, [props.lyric.ryte])

  useEffect(() => {
    if (props.lyricName) {
      setLyricName(props.lyricName)
    }
  }, [props.lyricName])

  const handleInputChange = (e: any): void => {
    const key = e.target.name
    const value = e.target.value
    if (value.length < 31) {
      setLyricName(value)
    }
  }

  const [openNextStepDialog, setOpenNextStepDialog] = useState<boolean>(false)
  const handleOpenCloseDialog = (): void => {
    setOpenNextStepDialog(!openNextStepDialog)
  }
  const [openFailedDialog, setOpenFailedDialog] = useState<boolean>(false)
  const handleOCErrorDialog = (): void => {
    setOpenFailedDialog(!openFailedDialog)
  }
  const [errMessage, setErrorMessage] = useState<string>("")

  const handleSaveLyric = async (): Promise<void> => {
    // let result = false
    setIsSaveLoading(true)

    try {
      const res: any = await saveLyric({ name: lyricName, ryte: props.lyric.ryte })
      if (res?.data) {
        handleOpenCloseDialog()
        props.getLyricList.refetch()
        setIsSaveLoading(false)
      } else {
        setErrorMessage(res.error.data.message)
        handleOCErrorDialog()
        setIsSaveLoading(false)
      }
    } catch (e: any) {
      setIsSaveLoading(false)
      if (e.message) {
        setToast({
          ...toast,
          open: true,
          message: '',
          type: "error"
        })
      } else {
        setToast({
          ...toast,
          open: true,
          message: 'e',
          type: "error"
        })
      }
    }
    // return result
  }

  const clearLyricFunction = (): void => {
    dispatch(clearLyric())
  }

  const handleRegenerateLyric = async (): Promise<void> => {
    if (props.isTypeLucky) {
      props.regenerate('feelingLucky')
    } else {
      props.regenerate('regenerate')
    }
  }

  return (
    <Box >
      <Toast {...toast} />
      <NextStepDialog
        openNextStepDialog={openNextStepDialog}
        openOrCloseDialog={handleOpenCloseDialog}
        afterNextStep={clearLyricFunction}
        currentPath='/lyric-result'
      />
      <ErrorDialog
        openFailedDialog={openFailedDialog}
        openOrCloseDialog={handleOCErrorDialog}
        errorMessage={errMessage}
      />
      <Box className={styles.container}>
        <Box className={styles.actions} sx={{ width: '100%', marginTop: '20px' }}>
          <Typography
            className={styles.generateTime}
            fontSize={16}
            color={'var(--wbl-font-link)'}
          >
            {`Generated within ${(props.lyric.generationTime / 1000).toFixed(2)} s`}
          </Typography>
          <CustomTextFieldSecondary
            placeholder='Example'
            sx={{
              width: screenSize.width > 570 ? '246.042px' : '100%',
              background: 'var(--wbl-input-bg)',
            }}
            value={lyricName}
            onChange={handleInputChange}
          />
          <ActionButton
            loading={isSaveLoading}
            btnAction='save'
            sx={{
              width: screenSize.width > 570 ? '246.042px' : '100%',
            }}
            onClick={handleSaveLyric}
          >
            Save Lyrics
          </ActionButton>
        </Box>
        <Box className={styles.actions} sx={{ width: '100%', marginTop: '20px' }}>
          <ActionButton
            btnAction='regen'
            sx={{
              width: screenSize.width > 570 ? '246.042px' : '100%',
            }}
            onClick={() => handleRegenerateLyric()}
          >
            Regenerate Lyrics
          </ActionButton>
        </Box>
        <Box className={styles.lyricContent}>
          <Card sx={{ padding: 3 }} className={styles.card}>
            <Box>
              {
                sections && sections.map((section: any, index: number) => {
                  return (
                    <Typography key={index} className={section.includes('[') || section.includes('(') ? styles.sectionType : styles.sectionContent}>{section}</Typography>
                  )
                })
              }
            </Box>
          </Card>
        </Box>
      </Box>
    </Box>
  )
}

export default GeneratedLyric
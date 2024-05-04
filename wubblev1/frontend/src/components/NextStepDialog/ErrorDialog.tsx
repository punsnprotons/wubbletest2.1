import React, { useEffect, useState } from 'react'
import { Box, Dialog, Typography } from '@mui/material'
import styles from './ErrorDialog.module.css'
import CustomButton from '../base/Button/CustomButton'
import NextIcon from '../icons/NextIcon'
import CloseIcon from '@mui/icons-material/Close'
import { useLocation, useNavigate } from 'react-router-dom'
import { getCurrentDimension } from '../../constants'

interface ErrorDialogProps {
  openFailedDialog: boolean
  openOrCloseDialog: () => void
  // afterFailedDialog: () => void
  // currentPath: string
  errorMessage: string
}

const ErrorDialog: React.FC<ErrorDialogProps> = ({
  openFailedDialog,
  openOrCloseDialog,
  // afterFailedDialog,
  // currentPath,
  errorMessage
}) => {

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
      open={openFailedDialog}
      onClose={() => openOrCloseDialog()}
    >
      <Box className={styles.container}>
        {/* close button */}
        <Box
          className={styles.closeBtnContainer}
          onClick={() => openOrCloseDialog()}
        >
          <CloseIcon className={styles.closeBtn} />
        </Box>
        {/* title */}
        <Box className={styles.titleContainer}>
          <Typography className={styles.title}>
            Warning
          </Typography>
          
        </Box>
        <Box className={styles.messageContainer}>
          <Typography sx={{ marginTop: '2rem'}}>
            { errorMessage }
          </Typography>
        </Box>

        {/* <Typography
          className={styles.cancelBtn}
          onClick={() => openOrCloseDialog()}
        >
          Go Back
        </Typography> */}
      </Box>
    </Dialog>
  )
}

export default ErrorDialog
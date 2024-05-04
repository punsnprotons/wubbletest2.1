import { useEffect, useState, useCallback } from 'react'
import { Box, CardMedia, Typography, InputLabel } from '@mui/material'
import CustomButton from '../../components/base/Button/CustomButton'
import { CustomTextFieldSecondary } from '../../components/base/TextField/CustomTextField'
import styles from './ForgotPassword.module.css'
import { getCurrentDimension, debounce, validateEmail } from '../../constants'
import { useNavigate } from 'react-router-dom'
import { useRequestResetPasswordMutation } from '../../api/auth/authRest'
import Toast from '../../components/base/Toast/Toast'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [toast, setToast] = useState({
    message: "",
    type: "error",
    open: false,
    handleClose: () => {
        setToast((prev) => ({ ...prev, open: false }))
    }
  })

  const [errors, setErrors] = useState<any>({
    email: {
      isError: false,
      errMsg: ''
    }
  })

  // post
  const [requestResetPassword] = useRequestResetPasswordMutation()

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension())
    }
    window.addEventListener('resize', updateDimension);

    return (() => {
      window.removeEventListener('resize', updateDimension);
    })
  }, [screenSize])

  const navigateHome = (): void => {
    navigate('/')
  }

  const validateSingleField = (obj: { key: string, value: string }) => {
    const { key, value } = obj
    let validate: any

    if (key === 'email') {
        validate = validateEmail(value)
        setErrors((prev: any) => ({ ...prev, [key]: validate }))
    }
  }

  // debounce handler
  const debounceHandler = useCallback(
    debounce(validateSingleField)
  , []);

  // input handler
  const handleInputChange = (e: any): void => {
    const key = e.target.name
    const value = e.target.value

    if (key === 'email') {
        setEmail(value)
    }

    debounceHandler({ key, value })
}

  const handleSubmit = async (): Promise<void> => {
    try {
      setIsLoading(true)
      const res: any = await requestResetPassword({ email })
      if(res?.data) {
        setToast({
          ...toast,
          open: true,
          message: res.data.message,
          type: "success"
        })
      }
      if (res.error) {
        setToast({
          ...toast,
          open: true,
          message: res.error.data.message,
          type: "error"
        })
      }
      setIsLoading(false)
    } catch (e) {
      setToast({
        ...toast,
        open: true,
        message: 'Something went wrong',
        type: "error"
      })
    }
  }

  return(
    <>
      <Toast {...toast}/>
      <Box className={ screenSize.width > 768 ? `${styles.forgotPasswordpage} bg-1` : styles.forgotPasswordpage}>
      <Box className={styles.forgotPasswordContainer}>
        {
          screenSize.width < 768 &&
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
        }
        <Typography color={'var(--wbl-font-primary)'}>
          Forgot Password
        </Typography>
        <Typography className={styles.contentText} sx={{color: 'var(--wbl-font-secondary)'}}>
          Enter your email address and we will send you a link to reset your password
        </Typography>
        <Box className = {styles.form}>
          <Box>
            <InputLabel className={styles.InputLabel} >
              Email
            </InputLabel>
            <CustomTextFieldSecondary
              id='email'
              name='email'
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => handleInputChange(e)}
              sx={{width: '100%'}}
              helperText={
                errors.email.isError ? errors.email.errMsg : ''
              }
            />
          </Box>
        </Box>
        <CustomButton className='btnPrimaryAction' sx={{marginTop: '30px'}} disabled={errors.email.isError} loading={isLoading} onClick={handleSubmit}>
          Submit
        </CustomButton>
      </Box>
    </Box>
    </>
  )
}

export default ForgotPassword
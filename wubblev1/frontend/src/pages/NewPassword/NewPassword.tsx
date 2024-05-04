import { useEffect, useState, useCallback } from 'react'
import { Box, CardMedia, IconButton, Typography, LinearProgress, InputLabel } from '@mui/material'
import CustomButton from '../../components/base/Button/CustomButton'
import { CustomTextFieldSecondary } from '../../components/base/TextField/CustomTextField'
import styles from './NewPassword.module.css'
import { getCurrentDimension, debounce, validateEmail, validatePassword, validateMatchPassword, validateLowerCase, validateUpperCase, validateNumber } from '../../constants'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useGetResetPasswordDataQuery, useResetPasswordMutation } from '../../api/auth/authRest'
import Toast from '../../components/base/Toast/Toast'

const NewPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [passwordRating, setPassRating] = useState<string>('')
  const [passwordBar, setPasswordBar] = useState<number>(0)
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const [newPassword, setNewPassword] = useState<string>('')
  const [newPassConfirmation, setNewPassConfirmation] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmationPassword, setShowConfirmationPassword] = useState<boolean>(false);
  const [token] = useState(useParams().token)
  const getResetPasswordToken = useGetResetPasswordDataQuery(token)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [toast, setToast] = useState({
    message: "",
    type: "error",
    open: false,
    handleClose: () => {
        setToast((prev) => ({ ...prev, open: false }))
    }
  })

  // post
  const [resetPassword] = useResetPasswordMutation() 

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension())
    }
    window.addEventListener('resize', updateDimension);

    return (() => {
      window.removeEventListener('resize', updateDimension);
    })
  }, [screenSize])

  useEffect(() => {
    if (getResetPasswordToken.isSuccess) {
      setEmail(getResetPasswordToken.data.email)
    }
  }, [getResetPasswordToken])

  const [errors, setErrors] = useState<any>({
    email: {
      isError: false,
      errMsg: ''
    }, 
    newPassword: {
      isError: true,
      errMsg: ''
    }, 
    newPassConfirmation: {
      isError: true,
      errMsg: ''
    },
    isLowerCase: {
      isError: true,
      errMsg: ''
    },
    isUpperCase: {
      isError: true,
      errMsg: ''
    },
    isNumber: {
      isError: true,
      errMsg: ''
    }
  })

  useEffect(() => {
    if(!email) {
      setErrors((prev: any) => ({ ...prev, email: { isError: true, errMsg: 'Required field.' } }))
    } else {
      setErrors((prev: any) => ({ ...prev, email: { isError: false, errMsg: '' } }))
    }
  }, [email])

  const isErrors = (): boolean | undefined => {
    return Object.keys(errors).some((key) => errors[key].isError)
  }

  useEffect(() => {
    // console.log(errors)
  }, [errors])

  const validateSingleField = (obj: { key: string, value: string }) => {
    const { key, value } = obj
    let validate: any

    if (key === 'email') {
        validate = validateEmail(value)
        setErrors((prev: any) => ({ ...prev, [key]: validate }))
    }

    if (key === 'newPassword') {
        validate = validatePassword(value)
        setErrors((prev: any) => ({ ...prev, [key]: validate }))
        let validateNum: any = validateNumber(value)
        setErrors((prev: any) => ({ ...prev, ['isNumber']: validateNum }))
        let validateLower: any = validateLowerCase(value)
        setErrors((prev: any) => ({ ...prev, ['isLowerCase']: validateLower }))
        let validateUpper: any = validateUpperCase(value)
        setErrors((prev: any) => ({ ...prev, ['isUpperCase']: validateUpper }))
    }

    // if (key === 'newPassConfirmation') {
    //   validate = validateMatchPassword(newPassword, newPassConfirmation)
    //   setErrors((prev: any) => ({ ...prev, [key]: validate }))
    // }
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

    if (key === 'newPassword') {
      setNewPassword(value)
    }

    if (key === 'newPassConfirmation') {
      setNewPassConfirmation(value)
    }

    debounceHandler({ key, value })
  }

  useEffect(() => {
    let validate: any
    validate = validateMatchPassword(newPassword, newPassConfirmation)
    setErrors((prev: any) => ({ ...prev, ['newPassConfirmation']: validate }))

  }, [newPassConfirmation])

  const navigateHome = (): void => {
    navigate('/')
  }

  useEffect(() => {
    const getPasswordRating = (password: string) => {
      let rating = 0
      // Check for at least 8 characters
      if (password.length >= 8) {
        rating += 25;
      }

      // Check for at least one lowercase letter
      if (/[a-z]/.test(password)) {
        rating += 25;
      }

      // Check for at least one uppercase letter
      if (/[A-Z]/.test(password)) {
        rating += 25;
      }

      // Check for at least one number
      if (/\d/.test(password)) {
        rating += 25;
      }

      setPasswordBar(rating)

      if (rating >= 75) {
        return 'Strong'
      }
      return 'Weak';
    }

    setPassRating(getPasswordRating(newPassword))
  }, [newPassword])

  const handleSubmit = async (): Promise<void> => {
    try {
      setIsLoading(true)
      const res: any = await resetPassword({ email, token, password: newPassword })
      if(res?.data) {
        setToast({
          ...toast,
          open: true,
          message: res.data.message,
          type: "success"
        })
        setNewPassword('')
        setNewPassConfirmation('')
        setTimeout(() => {
          navigate('/sign-in', { replace: true })
        }, 2000)
      }
      if (res.error) {
        setToast({
          ...toast,
          open: true,
          message: res.error.data.error,
          type: "error"
        })
      }
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
    }
  }

  return(
    <>
      <Toast {...toast} />
      <Box className={ screenSize.width > 768 ? `${styles.forgotPasswordpage} bg-1` : styles.forgotPasswordpage }>
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
          <Box className={styles.form}>
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
                disabled={true}
                sx={{width: '100%'}}
                helperText={
                  errors.email.isError ? errors.email.errMsg : ''
                }
              />
            </Box>
          </Box>

          <Box className={styles.form}>
            <Box>
              <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                <InputLabel className={styles.InputLabel} >
                  New Password
                </InputLabel>
                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                  <InputLabel className={styles.email} sx={{mb: '5px', mr: '5px'}}>
                    {passwordRating}
                  </InputLabel>
                  <Box sx={{ width: '121px', mt: '8px' }}>
                    <LinearProgress variant="determinate" value={passwordBar} sx={{
                      borderRadius: '7px',
                      height: '5px',
                      width: '121px',
                      backgroundColor: 'var(--wbl-outline-grey)',
                      '& .MuiLinearProgress-barColorPrimary': {
                        backgroundColor: 'var(--wbl-outline-blue2)',
                      },
                    }}/>
                  </Box>
                </Box>
              </Box>
              
              <CustomTextFieldSecondary
                id='newPassword'
                name='newPassword'
                type={ showPassword ? 'text' : 'password' }
                placeholder='Password'
                value={newPassword}
                onChange={(e) => handleInputChange(e)}
                sx={{width: '100%'}}
                // helperText={
                //   errors.newPassword.isError ? errors.newPassword.errMsg : ''
                // }
                InputProps={{
                  endAdornment: (
                    <IconButton
                      className={styles.eyeIconBtn}
                      aria-label="toggle password visibility"
                      onClick={(e) => setShowPassword(!showPassword)}
                    >
                      {
                        !showPassword ?
                          <VisibilityOff
                            sx={{
                              color: 'var(--wbl-outline-blue2)'
                            }}
                          />
                          :
                          <Visibility
                            sx={{
                              color: 'var(--wbl-outline-blue2)'
                            }}
                          />
                      }
                    </IconButton>
                  )
                }}
              />
            </Box>
          </Box>

          <Box sx={{color: 'var(--wbl-outline-grey)'}}>
            <Typography sx={{color: 'var(--wbl-font-primary)', fontSize: '14px'}}>Password must include:</Typography>
            <ol className={styles.ol}>
              <li className={errors.newPassword.isError ? styles.error : ''}>at least 8 characters</li>
              <li className={errors.isLowerCase.isError ? styles.error : ''}>a lower-case letter</li>
              <li className={errors.isUpperCase.isError ? styles.error : ''}>one capital letter</li>
              <li className={errors.isNumber.isError ? styles.error : ''}>and one number</li>
            </ol>
          </Box>

          <Box >
            <Box>
              <InputLabel className={styles.InputLabel} >
                Confirm New Password
              </InputLabel>
            
              <CustomTextFieldSecondary
                id='newPassConfirmation'
                name='newPassConfirmation'
                type={ showConfirmationPassword ? 'text' : 'password' }
                placeholder='Password'
                value={newPassConfirmation}
                onChange={(e) => handleInputChange(e)}
                sx={{width: '100%'}}
                helperText={
                  errors.newPassConfirmation.isError ? errors.newPassConfirmation.errMsg : ''
                }
                InputProps={{
                  endAdornment: (
                    <IconButton
                      className={styles.eyeIconBtn}
                      aria-label="toggle password visibility"
                      onClick={(e) => setShowConfirmationPassword(!showConfirmationPassword)}
                    >
                      {
                        !showConfirmationPassword ?
                          <VisibilityOff
                            sx={{
                              color: 'var(--wbl-outline-blue2)'
                            }}
                          />
                          :
                          <Visibility
                            sx={{
                              color: 'var(--wbl-outline-blue2)'
                            }}
                          />
                      }
                    </IconButton>
                  )
                }}
              />
            </Box>
          </Box>

          <CustomButton className='btnPrimaryAction' sx={{marginTop: '30px'}} disabled={isErrors()} onClick={handleSubmit}>
            Submit
          </CustomButton>
        </Box>
      </Box>
    </>
  )
}

export default NewPassword
import { useEffect, useState, useCallback } from 'react'
import { Box, CardMedia, Typography, InputLabel, IconButton } from '@mui/material'
import CustomButton from '../../components/base/Button/CustomButton'
import { CustomTextFieldSecondary } from '../../components/base/TextField/CustomTextField'
import styles from './ProfileSetting.module.css'
import { getCurrentDimension, debounce, validatePasswordv2, validateMatchPassword } from '../../constants'
import { useNavigate } from 'react-router-dom'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useGetProfileQuery, useUpdateProfileMutation } from '../../api/profile/profileRest'
import Toast from '../../components/base/Toast/Toast'

const ProfileSetting = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('anand@wubble.ai')
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const [name, setName] = useState<string>('')
  const [currentPassword, setCurrentPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [newConfirmPassword, setConfirmNewPassword] = useState<string>('')
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // get Profile
  const profile = useGetProfileQuery(null) 

  // post
  const [updateProfile] = useUpdateProfileMutation()

  const [toast, setToast] = useState({
    message: "",
    type: "error",
    open: false,
    handleClose: () => {
        setToast((prev) => ({ ...prev, open: false }))
    }
  })

  useEffect(() => {
    if (profile?.data) {
      setName(profile.data.name)
      setEmail(profile.data.email)
    }
  }, [profile])

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension())
    }
    window.addEventListener('resize', updateDimension);

    return (() => {
      window.removeEventListener('resize', updateDimension);
    })
  }, [screenSize])

  const [errors, setErrors] = useState<any>({
    name: {
      isError: false,
      errMsg: ''
    },
    currentPassword: {
      isError: false,
      errMsg: ''
    },
    newPassword: {
      isError: false,
      errMsg: ''
    },
    confirmNewPassword: {
      isError: false,
      errMsg: ''
    }
  })

  const isErrors = (): boolean | undefined => {
    return Object.keys(errors).some((key) => errors[key].isError)
  }

  const validateSingleField = (obj: { key: string, value: string }) => {
    const { key, value } = obj
    let validate: any

    if (key === 'name') {
        validate = {
          isError: false,
          errMsg: ''
        }
        if (!value) {
          validate = { isError: true, errMsg: 'Name is required' }
        }
        setErrors((prev: any) => ({ ...prev, [key]: validate }))
    }

    if (key === 'currentPassword') {
        validate = {
          isError: false,
          errMsg: ''
        }
        if (!value) {
          validate = { isError: true, errMsg: 'Password is required' }
        }
        setErrors((prev: any) => ({ ...prev, [key]: validate }))
    }

    if (key === 'newPassword') {
        validate = validatePasswordv2(value)
        setErrors((prev: any) => ({ ...prev, [key]: validate }))
    }

    // if (key === 'confirmNewPassword') {
    //    validate = validateMatchPassword(newPassword, newConfirmPassword)
    //    setErrors((prev: any) => ({ ...prev, [key]: validate }))
    // }
  }

  useEffect(() => {
    let validate: any
    validate = validateMatchPassword(newPassword, newConfirmPassword)
    setErrors((prev: any) => ({ ...prev, ['confirmNewPassword']: validate }))
  }, [newConfirmPassword])

  const navigateHome = (): void => {
    navigate('/')
  }

  const debounceHandler = useCallback(
    debounce(validateSingleField)
  , []);

  const handleInputChange = (e: any): void => {
    const key = e.target.name
    const value = e.target.value

    if (key === 'email') {
      setEmail(value)
    }

    if (key === 'name') {
      setName(value)
    }

    if (key === 'currentPassword') {
      setCurrentPassword(value)
    }

    if (key === 'newPassword') {
      setNewPassword(value)
    }

    if (key === 'confirmNewPassword') {
      setConfirmNewPassword(value)
    }

    debounceHandler({ key, value })
  }

  const handleSave = async (): Promise<void> => {
    try {
      setIsLoading(true)

      const res: any = await updateProfile({ currentPassword, newPassword, name })
      if (res?.data) {
        setToast({
          ...toast,
          open: true,
          message: res.data.message,
          type: "success"
        })
        setNewPassword('')
        setCurrentPassword('')
        setConfirmNewPassword('')
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
    } catch (e: any) {
      setToast({
        ...toast,
        open: true,
        message: 'Something went wrong',
        type: "error"
      })
    }
  }


  return (
    <>
      <Toast {...toast} />
      <Box className={`${styles.profileSettingPage} bg-2`}>
        <Box className={styles.profileSettingContainer}>
          {/* {
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
          } */}

          <Typography color={'var(--wbl-font-primary)'}>Settings</Typography>

          <Box className={styles.firstForm}>
            <Box className = {styles.form}>
              <Box>
                <InputLabel className={styles.InputLabel} >
                  Email
                </InputLabel>
                <CustomTextFieldSecondary
                  className={styles.disabledInput}
                  id='email'
                  name='email'
                  type='email'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => handleInputChange(e)}
                  sx={{width: '100%'}}
                  disabled={true}
                />
              </Box>
            </Box>
            <Box className = {styles.form}>
              <Box>
                <InputLabel className={styles.InputLabel} >
                  Name
                </InputLabel>
                <CustomTextFieldSecondary
                  id='name'
                  name='name'
                  type='text'
                  placeholder='Your Name'
                  value={name}
                  onChange={(e) => handleInputChange(e)}
                  sx={{width: '100%'}}
                  helperText={
                    errors.name.isError ? errors.name.errMsg : ''
                  }
                />
              </Box>
            </Box>
          </Box>

          <Typography color={'var(--wbl-font-primary)'} sx={{marginTop: '20px'}}>Change Password</Typography>
          <Box className={styles.mandatory}>
            <div className={styles.mandatorySq}></div>
            <span>Required Fields</span>
          </Box>

          <Box  sx={{marginTop: '20px'}}>
            <Box>
              <InputLabel className={styles.InputLabel} >
                Current Password
              </InputLabel>
              <CustomTextFieldSecondary
                id='currentPassword'
                name='currentPassword'
                type={ showCurrentPassword ? 'text' : 'password' }
                placeholder='Current Password'
                value={currentPassword}
                onChange={(e) => handleInputChange(e)}
                className={styles.changePassForm}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      className={styles.eyeIconBtn}
                      aria-label="toggle password visibility"
                      onClick={(e) => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {
                        !showCurrentPassword ?
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
                helperText={
                  errors.currentPassword.isError ? errors.currentPassword.errMsg : ''
                }
              />
            </Box>

            <Box sx={{marginTop: '20px'}}>
              <InputLabel className={styles.InputLabel} >
                New Password
              </InputLabel>
              <CustomTextFieldSecondary
                id='newPassword'
                name='newPassword'
                type={ showNewPassword ? 'text' : 'password' }
                placeholder='Password'
                value={newPassword}
                onChange={(e) => handleInputChange(e)}
                className={styles.changePassForm}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      className={styles.eyeIconBtn}
                      aria-label="toggle password visibility"
                      onClick={(e) => setShowNewPassword(!showNewPassword)}
                    >
                      {
                        !showNewPassword ?
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
                helperText={
                  errors.newPassword.isError ? errors.newPassword.errMsg : ''
                }
              />
            </Box>

            <Box sx={{marginTop: '20px'}}>
              <InputLabel className={styles.InputLabel} >
                Confirm New Password
              </InputLabel>
              <CustomTextFieldSecondary
                id='confirmNewPassword'
                name='confirmNewPassword'
                type={ showConfirmNewPassword ? 'text' : 'password' }
                placeholder='Password'
                value={newConfirmPassword}
                onChange={(e) => handleInputChange(e)}
                className={styles.changePassForm}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      className={styles.eyeIconBtn}
                      aria-label="toggle password visibility"
                      onClick={(e) => setShowConfirmNewPassword(!showConfirmNewPassword)}
                    >
                      {
                        !showConfirmNewPassword ?
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
                helperText={
                  errors.confirmNewPassword.isError ? errors.confirmNewPassword.errMsg : ''
                }
              />
            </Box>

            <CustomButton 
              className='btnPrimaryAction' 
              sx={{marginTop: '30px', width: screenSize.width <= 768 ? '100%' : '48%'}} 
              onClick={handleSave}
              disabled={isErrors()}
            > 
              Save
            </CustomButton>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default ProfileSetting
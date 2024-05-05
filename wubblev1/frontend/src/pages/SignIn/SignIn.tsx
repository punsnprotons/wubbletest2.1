/* eslint-disable no-loop-func */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react'
import { Box, CardMedia, IconButton, InputLabel, Typography } from '@mui/material'
import styles from './SignIn.module.css'
import { debounce, getCurrentDimension, validateEmail, validatePassword } from '../../constants'
import { CustomTextFieldSecondary } from '../../components/base/TextField/CustomTextField'
import CustomButton from '../../components/base/Button/CustomButton'
import { useNavigate } from 'react-router-dom'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useSignInMutation } from '../../api/auth/authRest'
import Toast from '../../components/base/Toast/Toast'
import { getAuthToken } from '../../constants'

const SignIn = () => {

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false);

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
    const [signIn] = useSignInMutation()

    // errors
    const [errors, setErrors] = useState<any>({
        email: {
            isError: false,
            errMsg: ''
        },
        password: {
            isError: false,
            errMsg: ''
        },
    })

    // screen size
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

    useEffect(() => {
        if (getAuthToken()) {
            navigate(-1)
        }
    }, [])

    // show password
    const handleTogglePassword = () => setShowPassword((show) => !show);

    // navigate home
    const navigateHome = (): void => {
        navigate('/')
    }

    // validate single field
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
        } else if (key === 'password') {
            setErrors((prev: any) => ({
                ...prev, [key]: {
                    isError: false,
                    errMsg: ''
                }
            }))
            setPassword(value)
        }

        debounceHandler({ key, value })
    }

    // validate login
    const validate = (loginData: any) => {
        let validate: any
        for (const [key, value] of Object.entries<string>(loginData)) {
            switch (key) {
                case 'email':
                    validate = validateEmail(value)
                    setErrors((prev: any) => ({ ...prev, [key]: validate }))
                    break;
                case 'password':
                    validate = validatePassword(value)
                    setErrors((prev: any) => ({ ...prev, [key]: validate }))
                    break;

                default:
                    break;
            }
        }

        return validate
    }

    // handle sign in event
    const handleSignIn = async (): Promise<void> => {
        alert('Request submitted');
        console.log('Request reached');
        try {

            const signInData: any = { email, password }
            alert('Email and pass entered');
            console.log(email);
            console.log(password);

            const hasError = validate(signInData)
            console.log(hasError)
            if (hasError.isError) {
                setIsLoading(false)
                throw new Error('Invalid credentials.')
            }

            setIsLoading(true)

            const res = await signIn(signInData).unwrap()

            if (res) {
                setToast({
                    ...toast,
                    open: true,
                    message: "Login successful.",
                    type: 'success'
                })
                setIsLoading(false)

                navigate('/song-creation')
            }
        } catch (e: any) {
            console.log('Error recieved')
            console.log('error:', e)
            console.log(e);
            setIsLoading(false)
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

    return (
        <>
            <Toast {...toast} />
            <Box
                className={
                    screenSize.width > 768 ?
                        `${styles.signInPage} bg-1`
                        :
                        styles.signInPage
                }
            >
                <Box
                    className={styles.signInContainer}
                >
                    {
                        screenSize.width < 600 &&
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
                    <Box className={styles.logoContainer}>
                        <CardMedia
                            className={styles.wblLogo}
                            component="img"
                            image={require("../../assets/logo/wbl-text-logo-md.png")}
                            loading="lazy"
                        />
                    </Box>
                    <Typography
                        color={'var(--wbl-font-primary)'}
                        className={styles.greetingText}
                    >
                        Where Music Meets Magic
                    </Typography>
                    <Box
                        className={styles.signInForm}
                    >
                        <Box>
                            <InputLabel
                                className={styles.InputLabel}
                            >
                                Email
                            </InputLabel>
                            <CustomTextFieldSecondary
                                id='email'
                                name='email'
                                type='email'
                                placeholder='Email'
                                size='small'
                                value={email}
                                onChange={(e) => handleInputChange(e)}
                                sx={{
                                    width: '100%',
                                }}
                                helperText={
                                    errors.email.isError ?
                                        errors.email.errMsg
                                        :
                                        ''
                                }
                            />
                        </Box>
                        <Box>
                            <InputLabel
                                className={styles.InputLabel}
                            >
                                Password
                            </InputLabel>
                            <CustomTextFieldSecondary
                                id='password'
                                name='password'
                                type={showPassword ? "text" : "password"}
                                placeholder='Password'
                                size='small'
                                value={password}
                                onChange={(e) => handleInputChange(e)}
                                sx={{
                                    width: '100%',
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            className={styles.eyeIconBtn}
                                            aria-label="toggle password visibility"
                                            onClick={handleTogglePassword}
                                        >
                                            {
                                                showPassword ?
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
                                    errors.password.isError ?
                                        errors.password.errMsg
                                        :
                                        ''
                                }
                            />
                        </Box>
                    </Box>
                    <Typography
                        className={styles.forgotPassword}
                        onClick={() => navigate('/forgot-password', { replace: true })}
                    >
                        Forgot Password
                    </Typography>

                    <CustomButton
                        loading={isLoading}
                        disabled={isLoading}
                        className='btnPrimaryAction'
                        sx={{
                            marginTop: '30px'
                        }}
                        onClick={() => handleSignIn()}
                    >
                        SIGN IN
                    </CustomButton>
                </Box>
            </Box >
        </>
    )
}

export default SignIn
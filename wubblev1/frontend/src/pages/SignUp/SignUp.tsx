/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, CardMedia, Typography } from '@mui/material'
import CustomButton from '../../components/base/Button/CustomButton'
import { CustomTextFieldSecondary } from '../../components/base/TextField/CustomTextField'
import styles from './SignUp.module.css'
import { debounce, getAuthToken, getCurrentDimension, validateEmail } from '../../constants'
import { useSignUpMutation } from '../../api/auth/authRest'
import Toast from '../../components/base/Toast/Toast'

const SignUp = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState<string>('')
    const [errors, setErrors] = useState({
        isError: false,
        errMsg: ''
    })
    const [isRegisterSuccess, setIsRegisterSuccess] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // screen size
    const [screenSize, setScreenSize] = useState(getCurrentDimension());

    useEffect(() => {
        if (getAuthToken()) {
            navigate(-1)
        }
    }, [])

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
    const [signUp] = useSignUpMutation()

    // validate single field
    const validateSingleField = (obj: { key: string, value: string }) => {
        const { key, value } = obj
        let validate: any

        if (key === 'email') {
            validate = validateEmail(value)
            setErrors((prev: any) => ({ ...prev, ...validate }))
        }
    }

    // debounce handler
    const debounceHandler = useCallback(
        debounce(validateSingleField)
        , []);

    // email input handler
    const handleEmailChange = (e: any): void => {
        const key = e.target.name
        const value = e.target.value

        setEmail(value)

        debounceHandler({ key, value })
    }

    const handleSignUp = async (): Promise<void> => {
        setIsLoading(true)

        try {
            const hasError = validateEmail(email)
            if (hasError.isError) {
                setErrors((prev: any) => ({ ...prev, ...hasError }))
                setIsLoading(false)
                throw new Error(hasError.errMsg)
            }

            const res = await signUp({ email }).unwrap()

            if (res) {
                setToast({
                    ...toast,
                    open: true,
                    message: "Register successful.",
                    type: 'success'
                })
                setIsRegisterSuccess(true)
                setIsLoading(false)
            }
        } catch (e: any) {
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

        // setTimeout(() => {
        //     setIsRegisterSuccess(true)
        //     setIsLoading(false)
        // }, 2000)
    }

    const navigateHome = (): void => {
        navigate('/')
    }

    return (
        <>
            <Toast {...toast} />
            <Box
                className={`${styles.signUpPage} bg-1`}
            >
                <Box
                    className={styles.signUpContainer}
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
                    <Box
                        className={styles.wblLogo}
                    >
                        <img
                            alt='wubble-logo'
                            src={require('../../assets/logo/wbl-logo-sm.png')}
                        />
                    </Box>
                    <Box
                        className={styles.greetings}
                    >
                        <Typography
                            className={styles.greeting1}
                        >
                            Unleash Your Musical Superpowers!
                        </Typography>
                        <Typography
                            className={styles.greeting2}
                        >
                            Compose, Create, and Conquer with the Music Generator on Wubble
                        </Typography>
                    </Box>

                    {
                        !isRegisterSuccess ?
                            <>
                                <Typography
                                    className={styles.greeting3}
                                >
                                    Sign Up For Early Access
                                </Typography>
                                <Box
                                    className={styles.formContainer}
                                >
                                    <Box>
                                        <CustomTextFieldSecondary
                                            id='email'
                                            name='email'
                                            type='email'
                                            placeholder='Email'
                                            size='small'
                                            value={email}
                                            onChange={(e) => handleEmailChange(e)}
                                            sx={{
                                                width: '246px',
                                            }}
                                            helperText={
                                                errors.isError ?
                                                    errors.errMsg
                                                    :
                                                    ''
                                            }
                                        />
                                    </Box>
                                    <CustomButton
                                        loading={isLoading}
                                        disabled={isLoading}
                                        className='btnPrimaryAction'
                                        sx={{
                                            width: '246px'
                                        }}
                                        onClick={() => handleSignUp()}
                                    >
                                        SIGN UP
                                    </CustomButton>
                                </Box>
                            </>
                            :
                            <Typography
                                className={styles.greeting2}
                            >
                                Thank you for signing up for our Registration Waitlist!
                                You've secured a front-row seat for early access.
                            </Typography>
                    }
                </Box>
            </Box>
        </>
    )
}

export default SignUp
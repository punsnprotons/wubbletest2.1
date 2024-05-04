import React, { useCallback, useEffect, useState } from 'react'
import { Box, Typography, InputLabel } from '@mui/material'
import styles from './Contact.module.css'
import CustomTextFieldPrimary, { CustomTextFieldSecondary } from '../../components/base/TextField/CustomTextField'
import { debounce, validateEmail, validateName, validateMessage } from '../../constants'
import { useSendEmailMutation } from '../../api/contact/contactRest'
import Toast from '../../components/base/Toast/Toast'
import CustomButton from '../../components/base/Button/CustomButton'

const Contact = () => {

  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [charMsgCount, setCharMsgCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // post
  const [sendEmailMessage] = useSendEmailMutation()

  // Toast state
  const [toast, setToast] = useState({
    message: "",
    type: "error",
    open: false,
    handleClose: () => {
      setToast((prev: any) => ({ ...prev, open: false }))
    }
  })

  // errors
  const [errors, setErrors] = useState<any>({
    email: {
      isError: false,
      errMsg: ''
    },
    name: {
      isError: false,
      errMsg: ''
    },
    message: {
      isError: false,
      errMsg: ''
    },
  })

  // validate single field
  const validateSingleField = (obj: { key: string, value: string }) => {
    const { key, value } = obj
    let validate: any

    if (key === 'email') {
      validate = validateEmail(value)
      setErrors((prev: any) => ({ ...prev, [key]: validate }))
    }

    if (key === 'name') {
      validate = validateName(value)
      setErrors((prev: any) => ({ ...prev, [key]: validate }))
    }

    if (key === 'message') {
      validate = validateMessage(value)
      setErrors((prev: any) => ({ ...prev, [key]: validate }))
    }
  }

  // debounce handler
  const debounceHandler = useCallback(
    debounce(validateSingleField)
    , []);

  const handleInputChange = (e: any): void => {
    const key = e.target.name
    const value = e.target.value

    if (key === 'email') {
      if (value.length <= 201) {
        setEmail(value)
      }
    } else if (key === 'name') {
      if (value.length <= 51) {
        setName(value)
      }
    } else if (key === 'message') {
      if (value.length <= 501) {
        setMessage(value)
        setCharMsgCount(value.length)
      }
    }

    debounceHandler({ key, value })
  }

  // validate send email
  const validate = (emailData: any) => {
    let validate: any

    for (const [key, value] of Object.entries<string>(emailData)) {

      switch (key) {

        case 'email':
          validate = validateEmail(value)
          setErrors((prev: any) => ({ ...prev, [key]: validate }))
          break;

        case 'name':
          validate = validateName(value)
          setErrors((prev: any) => ({ ...prev, [key]: validate }))
          break;

        case 'message':
          validate = validateMessage(value)
          setErrors((prev: any) => ({ ...prev, [key]: validate }))
          break;

        default:
          break;
      }
    }

    return validate
  }

  // clear input
  const clearInput = (): void => {
    setEmail('')
    setName('')
    setMessage('')
    setCharMsgCount(0)
  }

  // handle sned email
  const handleSendEmail = async (): Promise<void> => {
    try {
      const sendData: any = { email, name, message }
      const hasError = validate(sendData)

      if (hasError.isError) {
        setIsLoading(false)
        throw new Error('Please check the form.')
      }

      setIsLoading(true)

      const res = await sendEmailMessage({
        sender: email,
        senderName: name,
        message
      }).unwrap()

      if (res) {
        setToast({
          ...toast,
          open: true,
          message: res.message,
          type: 'success'
        })
        setIsLoading(false)
        clearInput()
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
  }

  return (
    <>
      <Toast {...toast} />
      <Box className={`${styles.contactPage} bg-2`}>
        <Box className={styles.contactContainer}>
          <Typography
            color={'var(--wbl-font-primary)'}
            className={styles.content}
          >
            Let's create, innovate, and harmonize with Wubble.ai - where the symphony of technology meets the melody of imagination
          </Typography>
          <Typography
            color={'var(--wbl-font-primary)'}
            className={styles.content}
          >
            Have questions, suggestions, or just want to share your musical experience with Wubble.ai?
          </Typography>
          <Typography
            color={'var(--wbl-font-primary)'}
            className={styles.content}
          >
            Send us a message
          </Typography>
          <Box
            className={styles.form}
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
                Name
              </InputLabel>
              <CustomTextFieldSecondary
                id='name'
                name='name'
                type='name'
                placeholder='Name'
                size='small'
                value={name}
                onChange={(e) => handleInputChange(e)}
                sx={{
                  width: '100%',
                }}
                helperText={
                  errors.name.isError ?
                    errors.name.errMsg
                    :
                    ''
                }
              />
            </Box>

            <Box>
              <InputLabel
                className={styles.InputLabel}
              >
                Message
              </InputLabel>
              <CustomTextFieldPrimary
                name='message'
                value={message}
                sx={{
                  width: '100%',
                  background: 'transparent !important',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      border: '1px solid var(--wbl-outline-grey)',
                      borderRadius: '7px',
                    },
                  },
                }}
                size='small'
                multiline
                rows={6}
                placeholder='eg. Hi Wubble...'
                onChange={e => handleInputChange(e)}
              />
              <Box className={styles.errorContainer}>
                <Typography
                  className={styles.errorMsgText}
                >
                  {errors.message.isError ? errors.message.errMsg : ''}
                </Typography>
                <Typography className={styles.charMsgCounter}>
                  <span
                    style={{
                      color: errors.message.isError ? 'var(--wbl-error)' : ''
                    }}
                  >
                    {`${charMsgCount} `}
                  </span>
                  / 500
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className={styles.sendBtn}>
            <CustomButton
              loading={isLoading}
              disabled={isLoading}
              className='btnPrimaryAction'
              onClick={() =>
                handleSendEmail()
              }
            >
              Send
            </CustomButton>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Contact
import { useState, useRef } from 'react'
import { Box, InputLabel, Typography } from '@mui/material'
import styles from './DragAndDrop.module.css'
import UploadIcon from '../icons/UploadIcon'
// import CustomTextFieldPrimary from '../base/TextField/CustomTextField'
import AudioFileIcon from '@mui/icons-material/AudioFile';
import { validateFileSize, validateAudioType } from '../../constants'
import Toast from '../base/Toast/Toast'

interface DragAndDropProps {
    label: string
    file: any
    setFile: (data: any) => void
    fileName: string
    setFileName: (data: any) => void
    inputRef: any
    resetFileInput: () => void
}

const DragAndDropAudio: React.FC<DragAndDropProps> = ({
    label, file, setFile, fileName, setFileName, inputRef, resetFileInput,
}) => {

    const [isDragActive, setIsDragActive] = useState<boolean>(false)

    const [error, setError] = useState({
        isError: false,
        errMsg: ''
    })

    const [toast, setToast] = useState({
        message: "",
        type: "error",
        open: false,
        handleClose: () => {
            setToast((prev) => ({ ...prev, open: false }))
        }
    })

    // const inputRef = useRef<HTMLInputElement>(null);
    // const resetFileInput = () => {
    //     // 👇️ reset input value
    //     if (inputRef.current) {
    //         console.log('inputRef:', inputRef.current)
    //         inputRef.current.value = '';
    //     }
    // };

    // handle drag events
    const handleDrag = function (e: any) {
        e.preventDefault()
        e.stopPropagation()

        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragActive(true)
        } else if (e.type === "dragleave") {
            setIsDragActive(false)
        }
    }

    // triggers when file is dropped
    const handleDrop = function (e: any) {
        e.preventDefault()
        e.stopPropagation()
        setIsDragActive(false)

        const file = e.dataTransfer.files[0]

        let validate = {
            isError: false,
            errMsg: ''
        }

        if (file) {


            validate = validateFileSize(file.size)
            setError(validate)

            if (validate.isError === false) {

                validate = validateAudioType(file.type)
                setError(validate)

                if (validate.isError === false) {
                    setFile(file)
                    setFileName(file.name)
                } else {
                    setToast({
                        ...toast,
                        message: validate.errMsg,
                        type: "error",
                        open: true
                    })
                }
            } else {
                setToast({
                    ...toast,
                    message: validate.errMsg,
                    type: "error",
                    open: true
                })
            }
        }
    }

    // audio upload handler
    const handleAudioFile = (e: any) => {
        const file = e.target.files[0]

        let validate = {
            isError: false,
            errMsg: ''
        }

        if (file) {
            validate = validateFileSize(file.size)
            setError(validate)

            if (validate.isError === false) {

                validate = validateAudioType(file.type)
                setError(validate)

                if (validate.isError === false) {
                    setFile(file)
                    setFileName(file.name)
                } else {
                    setToast({
                        ...toast,
                        message: validate.errMsg,
                        type: "error",
                        open: true
                    })
                }
            } else {
                setToast({
                    ...toast,
                    message: validate.errMsg,
                    type: "error",
                    open: true
                })
            }
        }
    }

    // clear uploaded files
    const clearUpload = (): void => {
        setFile(null)
        setFileName('')
        resetFileInput()
    }

    return (
        <>
            <Toast {...toast} />
            <Box
                className={styles.dragAndDrop}
            >
                <input
                    ref={inputRef}
                    id={label}
                    type="file"
                    name={label}
                    className={styles.inputFileUpload}
                    onChange={handleAudioFile}
                />
                {/* <CustomTextFieldPrimary
                    ref={inputRef}
                    id={label}
                    type="file"
                    name={label}
                    className={styles.inputFileUpload}
                    onChange={handleAudioFile}
                /> */}
                <Box
                    className={styles.dragAndDropContainer}
                >
                    {
                        !isDragActive && !file && <UploadIcon />
                    }
                    {
                        file && <AudioFileIcon className={styles.audioFile} />
                    }
                    {
                        file ?

                            <span
                                className={styles.fileNameText}
                            >
                                {fileName}
                            </span>
                            :
                            <div
                                className={styles.text}
                            >
                                {
                                    isDragActive ?
                                        <span className={styles.dropText}>
                                            Drop here
                                        </span>
                                        :
                                        <>
                                            <span>
                                                Drag and drop audio file to upload
                                            </span>
                                            <span>
                                                (.mp3, .wav)
                                            </span>
                                            <span>
                                                Less than 2 MB
                                            </span>
                                        </>
                                }
                            </div>
                    }

                    {
                        !file &&
                        <div id={styles.dragFileElement}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                        </div>
                    }
                </Box>
                <Box
                    className={styles.actionTextContainer}
                >
                    {
                        !file ?
                            <InputLabel
                                className={styles.actionText}
                                htmlFor={label}
                                sx={{
                                    textDecoration: 'underline',
                                    cursor: 'pointer'
                                }}
                            >
                                <span>
                                    Browse Files
                                </span>
                            </InputLabel>
                            :
                            <Typography
                                className={styles.actionText}
                                sx={{
                                    textDecoration: 'underline',
                                    cursor: 'pointer'
                                }}
                                onClick={() => clearUpload()}
                            >
                                <span>
                                    Remove Files
                                </span>
                            </Typography>
                    }
                    <Typography
                        className={styles.actionText}
                    >
                        Maximum file size: 2 MB
                    </Typography>
                </Box>
            </Box>
        </>
    )
}

export default DragAndDropAudio
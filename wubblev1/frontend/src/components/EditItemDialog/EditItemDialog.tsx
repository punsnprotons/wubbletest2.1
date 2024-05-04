import React, { useEffect, useState } from 'react'
import { Box, Dialog, InputLabel, Typography } from '@mui/material'
import styles from './EditItemDialog.module.css'
import CloseIcon from '@mui/icons-material/Close'
import CustomButton from '../base/Button/CustomButton'
import CustomTextFieldPrimary from '../base/TextField/CustomTextField'
import Toast from '../base/Toast/Toast'
import { useEditLyricMutation } from '../../api/lyric/lyricRest'
import { useEditGenreMutation } from '../../api/genreGeneration/genreGenerationRest'

interface EditItemDialogProps {
    openEditItemDialog: boolean
    openOrCloseEditItemDialog: () => void
    editData: any
}

const EditItemDialog: React.FC<EditItemDialogProps> = ({
    openEditItemDialog,
    openOrCloseEditItemDialog,
    editData,
}) => {

    const [title, setTitle] = useState<string>('')

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
    const [editLyric] = useEditLyricMutation()
    const [editGenre] = useEditGenreMutation()

    useEffect(() => {
        if (editData.itemData.name) {
            setTitle(editData.itemData.name)
        }
    }, [editData])

    // handle input title change
    const handleTitleInputChange = (e: any): void => {
        const value = e.target.value

        if (value.length <= 30) {
            setTitle(value)
        }
    }

    // handle click save button
    const handleSubmitSave = async (): Promise<void> => {
        try {

            if (title.length === 0) {
                throw new Error('Title cannot be empty.')
            }

            const data = {
                id: editData.itemData.id,
                newName: title
            }

            if (editData.itemType === 'lyric') {
                const editLyricRes = await editLyric(data).unwrap()

                if (editLyricRes) {
                    setToast({
                        ...toast,
                        open: true,
                        message: editLyricRes.message,
                        type: "success"
                    })
                    openOrCloseEditItemDialog()
                }
            }

            if (editData.itemType === 'genre') {
                const editGenreRes = await editGenre(data).unwrap()

                if (editGenreRes) {
                    setToast({
                        ...toast,
                        open: true,
                        message: editGenreRes.message,
                        type: "success"
                    })
                    openOrCloseEditItemDialog()
                }
            }

        } catch (e: any) {
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
            <Dialog
                open={openEditItemDialog}
                onClose={() => openOrCloseEditItemDialog()}
            >
                <Box className={styles.container}>
                    <Box
                        className={styles.closeBtnContainer}
                        onClick={() => openOrCloseEditItemDialog()}
                    >
                        <CloseIcon className={styles.closeBtn} />
                    </Box>
                    <Box
                        className={styles.titleContainer}
                    >
                        <Typography className={styles.title}>
                            Edit
                        </Typography>
                    </Box>
                    <Box className={styles.formInput}>
                        <InputLabel
                            className={styles.InputLabel}
                        >
                            {
                                editData.itemType === 'genre' ?
                                    'Clip Title'
                                    :
                                    editData.itemType === 'lyric' ?
                                        'Lyric Title'
                                        :
                                        'Vocal Title'
                            }
                        </InputLabel>
                        <CustomTextFieldPrimary
                            id='title'
                            name='title'
                            type='text'
                            placeholder='Title'
                            size='small'
                            value={title}
                            onChange={(e) => handleTitleInputChange(e)}
                            sx={{
                                width: '100%',
                                height: '45px'
                            }}
                        />
                    </Box>
                    <Box
                        className={styles.btnContainer}
                    >
                        <CustomButton
                            className='btnPrimaryAction'
                            sx={{
                                width: '246px',
                                borderRadius: '25px !important',
                                pl: '15px',
                                fontSize: { xs: '12px !important', sm: '16px !important' }
                            }}
                            onClick={() => handleSubmitSave()}
                        >
                            Save
                        </CustomButton>
                    </Box>
                </Box>
            </Dialog>
        </>
    )
}

export default EditItemDialog
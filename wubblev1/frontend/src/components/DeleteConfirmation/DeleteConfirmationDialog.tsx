import React from 'react'
import { Box, Dialog, Typography } from '@mui/material'
import styles from './DeleteConfirmation.module.css'
import CloseIcon from '@mui/icons-material/Close'
import CustomButton from '../base/Button/CustomButton'

interface DeleteConfirmationDialogProps {
    openDeleteConfirmationDialog: boolean
    openOrCloseDeleteConfirmationDialog: () => void
    deleteAction: () => any
    message: string
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
    openDeleteConfirmationDialog,
    openOrCloseDeleteConfirmationDialog,
    deleteAction,
    message
}) => {
    return (
        <Dialog
            open={openDeleteConfirmationDialog}
            onClose={() => openOrCloseDeleteConfirmationDialog()}
        >
            <Box className={styles.container}>
                <Box
                    className={styles.closeBtnContainer}
                    onClick={() => openOrCloseDeleteConfirmationDialog()}
                >
                    <CloseIcon className={styles.closeBtn} />
                </Box>
                <Box
                    className={styles.titleContainer}
                >
                    <Typography className={styles.title}>
                        Are you sure you wish to delete?
                    </Typography>
                    <Typography className={styles.subTitle}>
                        {message}
                    </Typography>
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
                        onClick={() => deleteAction()}
                    >
                        Delete
                    </CustomButton>
                </Box>
                <Typography
                    className={styles.cancelBtn}
                    onClick={() => openOrCloseDeleteConfirmationDialog()}
                >
                    Cancel
                </Typography>
            </Box>
        </Dialog>
    )
}

export default DeleteConfirmationDialog
import { Alert, Snackbar } from '@mui/material';

interface ToastProps {
    message: string
    type: any
    open: any
    handleClose?: any
};

const Toast: React.FC<ToastProps> = (props) => {
    const { open, handleClose, type } = props;

    return (
        <div>
            <Snackbar
                open={open}
                anchorOrigin={
                    { vertical: 'top', horizontal: 'center' }
                }
                autoHideDuration={5000}
                onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={type}
                    variant="filled"
                    sx={{
                        backgroundColor: type === 'success' ? '#893794' : 'var(--wbl-error2)',
                    }}
                >
                    {props.message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Toast





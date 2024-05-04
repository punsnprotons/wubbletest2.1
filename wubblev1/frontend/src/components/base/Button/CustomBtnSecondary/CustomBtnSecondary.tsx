import React from 'react'
import LoadingButton, { LoadingButtonProps as MuiLoadingButtonProps } from '@mui/lab/LoadingButton';
import styles from './CustomBtnSecondary.module.css'

interface ButtonProps extends MuiLoadingButtonProps {
    onClick?: (event?: any, row?: any) => void;
    className: string
};

const CustomBtnSecondary: React.FC<ButtonProps> = (props) => {
    return (
        <LoadingButton
            size={props.size}
            type={props.type}
            disabled={props.disabled}
            disableRipple={props.disableRipple}
            disableTouchRipple={props.disableTouchRipple}
            variant={props.variant}
            value={props.value}
            fullWidth={props.fullWidth}
            loading={props.loading}
            sx={{ ...props.sx }}
            className={`${styles[props.className]}`}
            onClick={props.onClick}
        >{props.children}</LoadingButton>
    )
}

export default CustomBtnSecondary
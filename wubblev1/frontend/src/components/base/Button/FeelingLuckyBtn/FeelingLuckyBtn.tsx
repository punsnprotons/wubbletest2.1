import React from 'react'
import LoadingButton, { LoadingButtonProps as MuiLoadingButtonProps } from '@mui/lab/LoadingButton';
import styles from './FeelingLuckyBtn.module.css'
import ShuffleIcon from '../../../icons/ShuffleIcon';

interface ButtonProps extends MuiLoadingButtonProps {
    onClick?: (event?: any, row?: any) => void;
};

const FeelingLuckyBtn: React.FC<ButtonProps> = (props: any) => {
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
            className={styles.btnPrimaryAction}
            onClick={props.onClick}
        >
            I’m Feeling Lucky
            <span
                className={styles.icon}
            >
                <ShuffleIcon />
            </span>
        </LoadingButton>
    )
}

export default FeelingLuckyBtn
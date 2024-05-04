import React from 'react'
import LoadingButton, { LoadingButtonProps as MuiLoadingButtonProps } from '@mui/lab/LoadingButton';
import styles from './ActionButton.module.css'
import SaveIcon from '../../../icons/SaveIcon';
import RegenIcon from '../../../icons/RegenIcon';
import PlayIcon from '../../../icons/PlayIcon';

// interface ButtonProps extends MuiLoadingButtonProps {
interface ButtonProps {
    onClick?: (event?: any, row?: any) => void;
    size?: any
    type?: any
    disabled?: any
    disableRipple?: any
    disableTouchRipple?: any
    variant?: any
    value?: any
    fullWidth?: any
    loading?: any
    sx?: any
    children?: any
    btnAction: string
};

const ActionButton: React.FC<ButtonProps> = (props) => {
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
            {props.children}
            <span
                className={styles.icon}
            >
                {
                    props.btnAction === 'save' &&
                    <SaveIcon />
                }
                {
                    props.btnAction === 'regen' &&
                    <RegenIcon />
                }
                {
                    props.btnAction === 'nextSample' &&
                    <PlayIcon
                        color={props.disabled ? 'var(--wbl-font-secondary)' : 'inherit'}
                    />
                }

                {/* {
                    props.children && (typeof props.children === 'string') && props.children.includes('save') &&
                    <SaveIcon />
                }
                {
                    props.children && (typeof props.children === 'string') && props.children.includes('regen') &&
                    <RegenIcon />
                } */}
            </span>
        </LoadingButton>
    )
}

export default ActionButton
import React from 'react'
import { styled } from '@mui/material/styles';
import TextField, { TextFieldProps } from '@mui/material/TextField';

const WblTextFieldPrimary = styled(TextField)({
    backgroundColor: 'var(--wbl-input-bg)',
    borderRadius: '7px',
    "& .MuiInputBase-root": {
        height: 155
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: '1px solid var(--wbl-outline-blue1)',
            borderRadius: '7px',
        },
        '&:hover fieldset': {
            border: '1px solid var(--wbl-outline-blue2)'
        },
        '&.Mui-focused fieldset': {
            border: '1px solid var(--wbl-outline-blue2)'
        },
        '&.Mui-error fieldset': {
            border: '1px solid var(--wbl-outline-blue2)'
        }
    },
});

const WblTextFieldSecondary = styled(TextField)({
    borderRadius: '7px',
    "& .MuiInputBase-root": {
        height: 45
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: '1px solid var(--wbl-outline-grey)',
            borderRadius: '7px',
        },
        '&:hover fieldset': {
            border: '1px solid var(--wbl-outline-blue2)'
        },
        '&.Mui-focused fieldset': {
            border: '1px solid var(--wbl-outline-blue2)'
        },
        '&.Mui-error fieldset': {
            border: '1px solid var(--wbl-outline-blue2)'
        }
    },
});

const CommentTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: 'none',
            borderRadius: '7px',
            color: '#909094',
        },
        '&:hover fieldset': {
            border: '1px solid var(--apex-gold2)'
        },
        '&.Mui-focused fieldset': {
            border: '1px solid var(--apex-gold2)'
        },
        '&.Mui-error fieldset': {
            border: '1px solid var(--apex-gold2)'
        }
    },
});

const WblTextFieldTertiary = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        background: 'var(--wbl-surface-bg)',
        borderRadius: '7px',
        '& fieldset': {
            border: '1px solid var(--wbl-outline-grey)',
            borderRadius: '7px',
            color: '#FFF'
        },
        '&:hover fieldset': {
            border: '1px solid var(--wbl-outline-grey)'
        },
        '&.Mui-focused fieldset': {
            border: '1px solid var(--wbl-outline-grey)',
            color: '#FFF'
        },
        '&.Mui-error fieldset': {
            border: '1px solid var(--wbl-outline-grey)'
        }
    },
});


const CustomTextFieldPrimary: React.FC<TextFieldProps> = (props) => {
    return (
        <WblTextFieldPrimary {...props} />
    )
}

export const CustomTextFieldSecondary: React.FC<TextFieldProps> = (props) => {
    return (
        <WblTextFieldSecondary {...props} />
    )
}

export const CustomTextFieldTertiary: React.FC<TextFieldProps> = (props) => {
    return (
        <WblTextFieldTertiary {...props} />
    )
}

export const CommentField: React.FC<TextFieldProps> = (props) => {
    return (
        <CommentTextField {...props} />
    )
}

export default CustomTextFieldPrimary
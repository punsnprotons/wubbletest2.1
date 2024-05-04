import React from 'react';
import { styled } from '@mui/material/styles';
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import ChevronIcon from '../../icons/ChevronIcon';
import { MenuItem } from '@mui/material';

const WblSelect = styled(Select)({
    height: '45px',
    backgroundColor: 'var(--wbl-input-bg)',
    '& .MuiOutlinedInput-notchedOutline': {
        border: '1px solid var(--wbl-outline-blue1)',
        borderRadius: '7px',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        border: '1px solid var(--wbl-outline-blue2)'
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: '1px solid var(--wbl-outline-blue2)'
    },
    '.MuiSelect-icon': {
        top: 'auto',
        marginRight: 0
    },
});

const WblSelectSecondary = styled(Select)({
    height: '40px',
    backgroundColor: 'var(--wbl-input-bg)',
    borderRadius: '7px',
    '& .MuiOutlinedInput-notchedOutline': {
        border: '1px solid var(--wbl-outline-grey)',
        borderRadius: '7px',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        border: '1px solid var(--wbl-outline-grey)'
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: '1px solid var(--wbl-outline-grey)'
    },
    '.MuiSelect-icon': {
        top: 'auto',
        marginRight: 0
    },
});

interface CustomSelectProps extends SelectProps {
    onChange: (event: SelectChangeEvent<any>) => void
    selected: any
    styles: any
    selectlabel: string
    options: any[]
};

const CustomSelect: React.FC<CustomSelectProps> = (props) => {
    return (
        <WblSelect
            IconComponent={ChevronIcon}
            {...props}
            sx={{
                ...props.styles,
                '&::before':
                    props.selected.id === 0 ?
                        {
                            content: `'${props.selectlabel}'`,
                            pl: 2,
                            color: 'var(--wbl-font-secondary)'
                        }
                        :
                        {}
            }}
        >
            {
                props.options.map((item) => (
                    <MenuItem
                        key={item.id}
                        value={item.id}
                    >
                        {item.name}
                    </MenuItem>
                ))
            }
        </WblSelect>
    )
}

export const CustomSelectSecondary: React.FC<CustomSelectProps> = (props) => {
    return (
        <WblSelectSecondary
            IconComponent={ChevronIcon}
            {...props}
            sx={{
                ...props.styles,
            }}
        >
            {
                props.options.map((item) => (
                    <MenuItem
                        key={item.id}
                        value={item.id}
                    >
                        {`Sort by: ${item.name}`}
                    </MenuItem>
                ))
            }
        </WblSelectSecondary>
    )
}

export const CustomSelectTertiary: React.FC<CustomSelectProps> = (props) => {
    return (
        <WblSelectSecondary
            IconComponent={ChevronIcon}
            {...props}
            sx={{
                ...props.styles,
            }}
        >
            {
                props.options.map((item) => (
                    <MenuItem
                        key={item.id}
                        value={item.id}
                    >
                        {`${item.name}`}
                    </MenuItem>
                ))
            }
        </WblSelectSecondary>
    )
}


export default CustomSelect
import React from 'react'
import styles from './CustomCheckbox.module.css'

interface CustomCheckboxProps {
    checked: boolean
    onClick: () => void
}

// const label = { inputProps: { 'aria-label': 'Wubble Checkbox' } };

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked, onClick }) => {
    return (
        <label
            className={styles.container}
        >
            <input
                type="checkbox"
                checked={checked}
                onChange={() => {
                    return
                }}
                onClick={() => onClick()}
            />
            <span
                className={styles.checkmark}
            />
        </label>

    )
}

export default CustomCheckbox
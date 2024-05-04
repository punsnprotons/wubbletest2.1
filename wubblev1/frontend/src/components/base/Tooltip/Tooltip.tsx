import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from 'react';
import { getCurrentDimension } from '../../../constants';
import { Box } from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';

interface CustomTooltipProps {
    children: any
    message: string
    type: string
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
    children,
    message,
    type
}) => {

    const [screenSize, setScreenSize] = useState(getCurrentDimension());

    useEffect(() => {
        const updateDimension = () => {
            setScreenSize(getCurrentDimension())
        }
        window.addEventListener('resize', updateDimension);

        return (() => {
            window.removeEventListener('resize', updateDimension);
        })
    }, [screenSize])

    const [open, setOpen] = useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    if (screenSize.width > 900) {
        return (
            <Tooltip
                title={message}
                arrow={true}
                componentsProps={{
                    arrow: {
                        sx: {
                            "&::before": {
                                backgroundColor: "var(--wbl-dropdown-menu-bg)",
                                border: "2px solid var(--wbl-dropdown-menu-bg)",
                            }
                        }
                    },
                    tooltip: {
                        sx: {
                            bgcolor: "var(--wbl-dropdown-menu-bg)",
                            color: "var(--wbl-font-primary)",
                            padding: '20px',
                            lineHeight: 'normal !important',
                            fontSize: '14px',
                            width: 'fit-content !important',
                        }
                    }
                }
                }
            >
                {children}
            </Tooltip>
        )
    } else {
        return (
            <ClickAwayListener onClickAway={handleTooltipClose}>
                <Tooltip
                    onClose={handleTooltipClose}
                    open={open}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title={message}
                    arrow={true}
                    componentsProps={{
                        arrow: {
                            sx: {
                                marginLeft: type === 'btnTooltip' ? '5.5%' : '-7%',
                                "&::before": {
                                    backgroundColor: "var(--wbl-dropdown-menu-bg)",
                                    border: "2px solid var(--wbl-dropdown-menu-bg)",
                                }
                            }
                        },
                        tooltip: {
                            sx: {
                                bgcolor: "var(--wbl-dropdown-menu-bg)",
                                color: "var(--wbl-font-primary)",
                                padding: '20px',
                                lineHeight: 'normal !important',
                                fontSize: '14px',
                                width: 'fit-content !important',
                                position: 'relative',
                                top: '-10px',
                                left: type === 'btnTooltip' ? '-5vw' : '5vw',
                            }
                        }
                    }
                    }
                >

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-end'
                        }}
                        onClick={handleTooltipOpen}
                    >
                        {children}
                    </Box>
                </Tooltip>
            </ClickAwayListener>
        )
    }
}

export default CustomTooltip
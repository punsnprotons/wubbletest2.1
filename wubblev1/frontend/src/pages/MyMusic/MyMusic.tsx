import React, { useState } from 'react'
import styles from './MyMusic.module.css'
import { Box, Typography, Tabs, Tab } from '@mui/material'
import { styled } from '@mui/material/styles';
import SaveIcon from '../../components/icons/SaveIcon';
import SavedPage from './Saved/SavedPage';
import MusicCLipsPage from './MusicClips/MusicCLipsPage';

const StyledTabs = styled(Tabs)({
    borderBottom: '1px solid #797979',
    height: 50,
    '& .MuiTabs-indicator': {
        backgroundColor: 'var(--wbl-font-yellow)',
    },
    '& .MuiTabs-scrollButtons.Mui-disabled': {
        width: 'auto',
        opacity: 0.5
    }
});

const StyledTab = styled((props: any) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
        color: 'var(--wbl-font-primary)',
        fontSize: '16px',
        marginRight: '60px',
        padding: '0px',
        minHeight: 50,
        '&.Mui-selected': {
            color: 'var(--wbl-font-yellow)',
        },
        '&.MuiTab-iconWrapper': {
            marginRight: 8
        }
    }),
);

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box
                    sx={{ mt: 2 }}
                >
                    {children}
                </Box>
            )}
        </div>
    );
}

const MyMusic = () => {

    const [value, setValue] = useState(0)

    const handleTabChange = () => {
        if (value === 0) {
            setValue(1)
        } else {
            setValue(0)
        }
    }

    return (
        // <Box className={`${styles.myMusicPage} bg-2`}>
        <Box className={`${styles.myMusicPage}`}>
            <Box className={styles.myMusicContainer}>
                <Typography
                    fontSize={20}
                    color={'var(--wbl-font-primary)'}
                >
                    My Music
                </Typography>

                <Box className={styles.tabsContainer}>
                    <StyledTabs
                        value={value}
                        onChange={(e) => handleTabChange()}
                        aria-label="nav tabs"
                    >
                        <StyledTab
                            label="Saved"
                            disableRipple
                            // component={Link}
                            to={"/"}
                            icon={
                                <SaveIcon
                                    active={value === 0 ? true : false}
                                    sx={{
                                        width: '24px',
                                        marginRight: '10px'
                                    }}
                                />
                            }
                            iconPosition="end"
                        />
                        <StyledTab
                            label="Music Clips"
                            disableRipple
                            // component={Link}
                            to={"/"}
                            icon={
                                <SaveIcon
                                    active={value === 1 ? true : false}
                                    sx={{
                                        width: '24px'
                                    }}
                                />
                            }
                            iconPosition="end"
                        />
                    </StyledTabs>
                    <Box>
                        <CustomTabPanel value={value} index={0}>
                            <SavedPage
                                setValue={setValue}
                            />
                        </CustomTabPanel>
                    </Box>
                    <Box>
                        <CustomTabPanel value={value} index={1}>
                            <MusicCLipsPage />
                        </CustomTabPanel>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default MyMusic
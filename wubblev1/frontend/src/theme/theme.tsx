import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: 'var(--wbl-page-bg)',
            paper: 'var(--wbl-surface-bg)'
        }
    },
    breakpoints: {
        values: {
            xs: 0, //mobile
            sm: 768, //tablet
            md: 1024,
            lg: 1200,
            xl: 1675,
        },
    },
    typography: {
        fontFamily: ['Rubik', 'sans-serif'].join(','),
        fontSize: 16,
        button: {
            fontSize: 16,
            fontWeight: 400,
            textTransform: 'none'
        },
    },
    components: {
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: '14px',
                    color: 'var(--wbl-outline-blue2)'
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    fontSize: '16px',
                    color: 'var(--wbl-font-primary)',
                    position: 'relative'
                },
            }
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    fontSize: '12px',
                    color: "var(--wbl-error)",
                    marginLeft: '0px',
                    position: 'relative',
                }
            }
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    color: 'var(--wbl-font-primary)',
                },
            }
        },
    }
});

export default theme;

// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#4a90e2', // Customize primary color
        },
        secondary: {
            main: '#f5f5f5', // Customize secondary color
        },
        text: {
            primary: '#000000',
            secondary: '#7a7a7a',
        },
        background: {
            default: '#ffffff',
            paper: '#ffffff',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
});

export default theme;

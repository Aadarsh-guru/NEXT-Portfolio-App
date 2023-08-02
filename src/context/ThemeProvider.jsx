'use client'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useData } from './DataProvider';

function Theme({ children }) {

    const { theme } = useData()

    const darkTheme = createTheme({
        palette: {
            mode: theme ? theme : 'dark',
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}

export default Theme;

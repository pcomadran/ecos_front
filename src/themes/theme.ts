import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Nunito, sans-serif',
    allVariants: {
      fontFamily: 'Nunito, sans-serif',
    },
  },
  palette: {
    primary: {
      main: '#4E169D',
    },
    secondary: {
      main: '#FAFAFA',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: 'Nunito, sans-serif',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: 'auto',
          color: '#4E169D',
          backgroundColor: 'rgba(250, 250, 250, 0.2)',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Nunito, sans-serif',
        },
        h5: {
          textAlign: 'center',
        },
        body2: {
          whiteSpace: 'pre-line',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          maxWidth: 328,
          backgroundColor: '#EAEAEA',
          borderRadius: 3,
        },
      },
    },
  },
});

export default theme;

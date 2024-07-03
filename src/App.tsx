import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './themes/theme';
import Navbar from './components/Navbar';
import LandingPage from './pages/landinPage';
import Publications from './pages/publications';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Navbar />
        {/* <LandingPage /> */}
        <Publications />
      </div>
    </ThemeProvider>
  );
}

export default App;

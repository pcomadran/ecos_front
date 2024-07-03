import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './themes/theme';
import Navbar from './components/Navbar';
import LandingPage from './pages/landinPage';
import ImgMediaCard from './components/ImgMediaCard';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Navbar />
        <LandingPage />
      </div>
    </ThemeProvider>
  );
}

export default App;

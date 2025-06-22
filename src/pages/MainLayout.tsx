import { Outlet } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useState } from 'react';

export function MainLayout() {
  const [darkMode, setDarkMode] = useState(true);

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: '#ffffff', // világos háttér
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#121212', // sötét háttér
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <button onClick={() => setDarkMode(!darkMode)}>Toggle Dark Mode</button>
        <Outlet />
        <Footer />
      </ThemeProvider>
    </>
  );
}

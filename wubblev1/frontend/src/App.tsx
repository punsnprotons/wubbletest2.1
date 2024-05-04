import { StyledEngineProvider, createTheme, ThemeProvider } from '@mui/material/styles';
import { RouterProvider } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import { router } from './router';
import theme from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <RouterProvider router={router} />
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default App;

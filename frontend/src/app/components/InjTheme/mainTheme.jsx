import { CssBaseline, ThemeProvider } from '@mui/material';
import useSettings from 'app/hooks/useSettings';

const InTheme = ({ children }) => {
  const { settings } = useSettings();
  let activeTheme = { ...settings.themes[settings.activeTheme] };

  return (
    <ThemeProvider theme={activeTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default InTheme;

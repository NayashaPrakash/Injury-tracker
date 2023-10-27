import { CssBaseline } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { InTheme } from './components';
import { AuthProvider } from './contexts/AuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import routes from './routes';

const App = () => {
  const content = useRoutes(routes);

  return (
    <SettingsProvider>
      <AuthProvider>
        <InTheme>
          <CssBaseline />
          {content}
        </InTheme>
      </AuthProvider>
    </SettingsProvider>
  );
};

export default App;

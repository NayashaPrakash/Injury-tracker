import { memo } from 'react';
import { Icon, IconButton, useMediaQuery, Box, styled, useTheme } from '@mui/material';
import useAuth from 'app/hooks/useAuth';
import { themeShadows } from 'app/components/InjTheme/themeColors';
import useSettings from 'app/hooks/useSettings';
import { topBarHeight } from 'app/utils/constant';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary
}));

const TopbarRoot = styled('div')({
  top: 0,
  zIndex: 96,
  height: topBarHeight,
  boxShadow: themeShadows[8],
  transition: 'all 0.3s ease'
});

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: '8px',
  paddingLeft: 18,
  paddingRight: 20,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: theme.palette.primary.main,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 16,
    paddingRight: 16
  },
  [theme.breakpoints.down('xs')]: {
    paddingLeft: 14,
    paddingRight: 16
  }
}));

const Layout1Topbar = () => {
  const theme = useTheme();
  const { logout, user } = useAuth();
  const { settings, updateSettings } = useSettings();
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({ layout1Settings: { leftSidebar: { ...sidebarSettings } } });
  };

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === 'close' ? 'mobile' : 'close';
    } else {
      mode = layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full';
    }
    updateSidebarMode({ mode });
  };

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          <StyledIconButton onClick={handleSidebarToggle}>
            <Icon>menu</Icon>
          </StyledIconButton>
        </Box>
        <button onClick={logout}>
          <Icon> power_settings_new </Icon>
        </button>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default memo(Layout1Topbar);

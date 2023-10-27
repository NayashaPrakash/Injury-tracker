import { Stack } from '@mui/material';
import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import SimpleForm from './SimpleForm';
import AuthContext from 'app/contexts/AuthContext';
import { useContext } from 'react';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const AppForm = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Report', path: '/to' }, { name: 'Create' }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard>
          <SimpleForm />
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default AppForm;

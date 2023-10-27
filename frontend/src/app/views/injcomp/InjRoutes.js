import { lazy } from 'react';
import Loadable from 'app/components/Loadable';

const AppForm = Loadable(lazy(() => import('./forms/AppForm')));
const AppProgress = Loadable(lazy(() => import('./AppProgress')));

const materialRoutes = [
  { path: '/to/form', element: <AppForm /> },
  { path: '/to/history', element: <AppProgress /> }
];

export default materialRoutes;

export const navigations = [
  { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
  { label: 'PAGES', type: 'label' },
  {
    name: 'Session',
    icon: 'security',
    children: [
      { name: 'Sign in', iconText: '->', path: '/session/signin' },
      { name: 'Sign up', iconText: '->', path: '/session/signup' }
    ]
  },

  { name: 'Form', path: '/to/form', icon: 'playlist_add' },
  { name: 'History', path: '/to/history', icon: 'storage' }
];

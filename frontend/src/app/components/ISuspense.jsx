import { Suspense } from 'react';
import { InjLoading } from 'app/components';

const ISuspense = ({ children }) => {
  return <Suspense fallback={<InjLoading />}>{children}</Suspense>;
};

export default ISuspense;

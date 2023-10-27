import { ISuspense } from 'app/components';
import useSettings from 'app/hooks/useSettings';
import { InLayouts } from './index';

const ILayout = (props) => {
  const { settings } = useSettings();
  const Layout = InLayouts[settings.activeLayout];

  return (
    <ISuspense>
      <Layout {...props} />
    </ISuspense>
  );
};

export default ILayout;

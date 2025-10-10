import { Preloader } from '@ui';
import {
  authUserCheckedSelector,
  userDataSelector
} from '../../services/slices/user-slice';
import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactElement;
  publicRoute?: boolean;
};

export function ProtectedRoute({ children, publicRoute }: ProtectedRouteProps) {
  const location = useLocation();
  const user = useSelector(userDataSelector);
  const authUserCheck = useSelector(authUserCheckedSelector);

  if (!authUserCheck) {
    return <Preloader />;
  }

  if (publicRoute && user) {
    const from = location.state?.from || { pathname: '/' };

    return (
      <Navigate
        to={from}
        state={{
          background: from?.state?.background
        }}
      />
    );
  }

  if (!publicRoute && !user) {
    return (
      <Navigate
        to='/login'
        state={{
          from: location
        }}
      />
    );
  }

  return children;
}

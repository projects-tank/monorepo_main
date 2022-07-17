import { lazy, Suspense, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';

// types Props
import { AuthChildProps as IProps } from '../@types/AuthChildProps.types';

// Custom Import
const Login = lazy(() => import('../pages/login'));

interface LocationState {
  from: {
    pathname: string;
  };
}

// Prevented: Pages like Login, Register, Forgot Password etc.
const PreventedElement = ({ children, auth }: IProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { from } = (location.state as LocationState) || { from: { pathname: '/' } };

  useEffect(() => {
    if (auth) {
      navigate(from, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  return children;
};
export default PreventedElement;

const loginRoute = {
  path: 'login',
  index: true,
  element: Login
};
const registerRoute = {
  path: 'register',
  index: true,
  element: Login
};

export const authRoutes = [loginRoute, registerRoute];

export const preventedRoute = (auth: boolean) => {
  return authRoutes.map(({ element: Comp, ...props }: any) => {
    return {
      ...props,
      element: (
        <>
          <Suspense fallback={<Loader />}>
            <PreventedElement auth={auth} children={<Comp />} />
          </Suspense>
        </>
      )
    };
  });
};

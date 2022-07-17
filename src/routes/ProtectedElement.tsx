// types Props
// import { AuthChildProps as IProps } from '../@types/AuthChildProps.types';

import React, { lazy, LazyExoticComponent, Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Custom Imports
import LayoutWrapper from '../layouts/LayoutWrapper';
const Home = lazy(() => import('../pages/dashboard'));
const Contact = lazy(() => import('../pages/contact'));
const Terms = lazy(() => import('../pages/contact/Terms'));
const Privacy = lazy(() => import('../pages/contact/Privacy'));

interface FlatRoutesProps {
  auth: boolean;
  location: {};
  routeArr: ChildRouteProps[];
}
interface ChildRouteProps {
  children?: ChildRouteProps[];
  path: string;
  index?: boolean;
  element: LazyExoticComponent<(props: any) => React.ReactElement> | any;
}

export const homeRoutes = {
  path: '',
  index: true,
  element: Home
};
export const contactRoute = {
  path: 'contact/',
  element: Contact,
  children: [
    {
      index: true,
      path: '',
      element: Terms
    },
    {
      path: ':id/',
      element: Privacy
    }
  ]
};

export const routeArr: ChildRouteProps[] = [homeRoutes, contactRoute];

export const flatRoutes = ({ auth, location, routeArr }: FlatRoutesProps) => {
  return routeArr.map((route): ChildRouteProps => {
    return {
      ...route,
      element: auth ? (
        <>
          <LayoutWrapper />
          <route.element {...route} />
          <Outlet />
        </>
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      ),
      children: route.children?.map(({ element: ChildComp, ...props }): ChildRouteProps => {
        return {
          ...props,
          element: (
            <>
              <Suspense fallback={<div>Loading...</div>}>
                <ChildComp {...props} />
                <Outlet />
              </Suspense>
            </>
          )
        };
      })
    };
  });
};

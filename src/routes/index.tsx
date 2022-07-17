import React, { useState, lazy, Suspense } from 'react';
import { useRoutes, useLocation } from 'react-router-dom';

// // Custom Import
import { preventedRoute } from './PreventedElement';
import { flatRoutes, routeArr } from './ProtectedElement';
const NoMatch = lazy(() => import('./NoMatch'));

export const AppRouter = () => {
  const [auth] = useState(true);
  let location = useLocation();
  const rootRoute = [
    ...flatRoutes({ auth, location, routeArr }),
    ...preventedRoute(auth),
    {
      path: '*',
      element: <NoMatch />
    }
  ];
  let element = useRoutes(rootRoute);

  return <Suspense>{element}</Suspense>;
};

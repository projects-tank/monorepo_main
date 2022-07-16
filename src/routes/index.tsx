import React, { useState } from 'react';
import { useRoutes, useLocation } from 'react-router-dom';

// // Custom Import
import { preventedRoute } from './PreventedElement';
import { flatRoutes, routeArr } from './ProtectedElement';
import NoMatch from './NoMatch';

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

  return element;
};

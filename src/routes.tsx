import { Outlet, RootRoute, useNavigate } from '@tanstack/react-router';
import React, { useEffect } from 'react';

// Create a root route
export const rootRoute = new RootRoute({
  component: Root,
});

function Root() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate({ to: '/' });
    }, 1);
  }, []);
  return <Outlet />;
}

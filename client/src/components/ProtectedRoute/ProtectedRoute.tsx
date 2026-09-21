import type React from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactElement;
  isLoggedIn: boolean;
};

function ProtectedRoute({
  children,
  isLoggedIn,
}: ProtectedRouteProps): React.ReactElement {
  return isLoggedIn ? children : <Navigate to='/signin' replace />;
}

export default ProtectedRoute;

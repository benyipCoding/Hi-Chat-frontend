import { useAuth } from '@/hooks/useAuth';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

const AuthenticatedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <></>; // Maybe add a Loader page for loading status
  if (user) return <>{children}</>;
  return <Navigate to="/login" replace />;
};

export default AuthenticatedRoute;

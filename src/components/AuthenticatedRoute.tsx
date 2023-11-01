import { AuthContext } from '@/context/AuthContext';
import { PropsWithChildren, useContext } from 'react';
import { Navigate } from 'react-router-dom';

const AuthenticatedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  return <div>AuthenticatedRoute</div>;
};

export default AuthenticatedRoute;

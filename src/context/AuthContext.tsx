import { User } from '@/utils/types';
import { createContext } from 'react';

type AuthContextType = {
  user?: User;
  updateAuthUser: (data: User) => void;
};

export const AuthContext = createContext<AuthContextType>({
  updateAuthUser: () => {},
});

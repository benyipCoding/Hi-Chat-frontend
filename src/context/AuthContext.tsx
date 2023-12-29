import { User } from '@/utils/types';
import { createContext } from 'react';

type AuthContextType = {
  user?: User;
  updateAuthUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

export const AuthContext = createContext<AuthContextType>({
  updateAuthUser: () => {},
});

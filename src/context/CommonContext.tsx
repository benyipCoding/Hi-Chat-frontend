import { createContext } from 'react';

export const CommonContext = createContext<
  NodeListOf<HTMLDivElement> | undefined
>(undefined);

import { useContext } from 'react';
import { NavigationContext } from '../context';

export const useReadyContext = () => {
  const context = useContext(NavigationContext);

  return context!;
};

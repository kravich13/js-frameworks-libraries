import { useContext } from 'react';
import { NavigationContext } from '../context';

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);

  return context!;
};

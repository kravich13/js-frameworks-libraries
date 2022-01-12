import { useContext } from 'react';
import { Context } from '../context';

export const useReadyContext = () => {
  const context = useContext(Context);

  return context!;
};

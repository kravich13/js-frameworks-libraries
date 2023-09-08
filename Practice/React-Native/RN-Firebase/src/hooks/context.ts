import { useContext } from 'react';
import { AuthGoogleContext, AuthGoogleContextType } from '../contexts';

export const use0AuthGoogleContext = () => useContext(AuthGoogleContext) as AuthGoogleContextType;

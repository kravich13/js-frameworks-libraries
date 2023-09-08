import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthSessionResult } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, User, onAuthStateChanged, signInWithCredential } from 'firebase/auth';
import { createContext, useCallback, useEffect, useState } from 'react';
import { auth } from '../../firebase.config';

export interface AuthGoogleContextType {
  isAuth: boolean;
  userInfo: User | null;
  loading: boolean;
  signIn: () => Promise<AuthSessionResult>;
  signOut: () => Promise<void>;
}

export const AuthGoogleContext = createContext<AuthGoogleContextType | null>(null);

WebBrowser.maybeCompleteAuthSession();

interface AuthGoogleProviderProps {
  children: React.ReactNode;
}

export const AuthGoogleProvider: React.FC<AuthGoogleProviderProps> = ({ children }) => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    iosClientId: '884283500966-v4d33p5p5k0u7nlb49066tv30s7po40t.apps.googleusercontent.com',
    androidClientId: '884283500966-50a5fbq2eqcpmpmrg4d26i85eadvvvc9.apps.googleusercontent.com',
  });

  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const checkLocalUser = useCallback(async () => {
    try {
      setLoading(true);

      const userJSON = await AsyncStorage.getItem('user');
      const user = userJSON ? JSON.parse(userJSON) : null;

      setUserInfo(user);
    } catch (error) {
      alert('Error getting user');
    }

    setLoading(false);
  }, []);

  const handleSignOut = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('user');
      await auth.signOut();

      setUserInfo(null);
    } catch (error) {
      alert('Error signing out');
    }
  }, []);

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      (async () => {
        setLoading(true);

        try {
          const userCredential = await signInWithCredential(auth, credential);
          const { user } = userCredential;

          await AsyncStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
          console.log(error);
        }

        setLoading(false);
      })();
    }
  }, [response]);

  useEffect(() => {
    checkLocalUser();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await AsyncStorage.setItem('user', JSON.stringify(user));
        setUserInfo(user);
      } else {
        console.log('User is not logged in');
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthGoogleContext.Provider
      value={{
        isAuth: Boolean(userInfo),
        userInfo,
        loading,
        signIn: () => promptAsync(),
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthGoogleContext.Provider>
  );
};

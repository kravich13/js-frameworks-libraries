import { useEffect } from 'react';
import { Alert } from 'react-native';
import shallow from 'zustand/shallow';
import { useStore } from '../zustand/useStore';

export const useCryptoAlert = () => {
  const { alertText, resetAlert } = useStore(({ alertText, resetAlert }) => ({ alertText, resetAlert }), shallow);

  useEffect(() => {
    if (alertText) {
      Alert.alert(alertText);

      resetAlert();
    }
  }, [alertText]);
};

import React, { useCallback } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { use0AuthGoogleContext } from '../hooks';

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
  const { signIn } = use0AuthGoogleContext();

  const handleSignIn = useCallback(() => {
    signIn();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login with Google and Firebase</Text>

      <Button title="Google Sign-In" color="blue" onPress={handleSignIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  text: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
  },
});

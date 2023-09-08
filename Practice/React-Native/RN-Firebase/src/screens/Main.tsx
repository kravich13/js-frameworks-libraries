import { View, Text, StyleSheet, Button } from 'react-native';
import { use0AuthGoogleContext } from '../hooks';
import { useCallback } from 'react';

interface MainProps {}

export const Main: React.FC<MainProps> = ({}) => {
  const { userInfo, signOut } = use0AuthGoogleContext();

  const handleSignOut = useCallback(() => {
    signOut();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>You are authorized</Text>

      <View>
        <Text>User info</Text>

        <Text>Name: {userInfo?.displayName}</Text>
        <Text>Email: {userInfo?.email}</Text>
      </View>

      <Button title="Logout" color="red" onPress={handleSignOut} />
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

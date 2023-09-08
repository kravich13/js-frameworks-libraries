import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { use0AuthGoogleContext } from '../hooks';
import { AuthNavigator, NotAuthNavigator } from './navigators';

interface NavigationProps {}

export const Navigation: React.FC<NavigationProps> = () => {
  const { isAuth, loading } = use0AuthGoogleContext();

  if (loading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );

  return (
    <NavigationContainer>{isAuth ? <AuthNavigator /> : <NotAuthNavigator />}</NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

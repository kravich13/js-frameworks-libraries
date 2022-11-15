import { gql } from '@apollo/client';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { client } from './store/apolloClient';

export default function App() {
  useEffect(() => {
    client
      .query({
        query: gql`
          query Country {
            country(code: "BR") {
              name
              native
              capital
              emoji
              currency
            }
          }
        `,
      })
      .then((result) => console.log(result));
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

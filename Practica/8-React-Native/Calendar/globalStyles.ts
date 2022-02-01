import { StyleSheet } from 'react-native';
import { Colors } from './constants';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  containerDay: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 15,
  },

  dayOff: {
    color: 'grey',
  },

  currentDay: {
    backgroundColor: Colors.currentDay,
    borderRadius: 50,
  },
});

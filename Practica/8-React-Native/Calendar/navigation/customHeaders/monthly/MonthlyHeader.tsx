import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Text, View } from '../../../components/ThemesAndStyles';
import { IMonthlyHeader_Props } from '../../../interfaces';
import { AntDesign } from '@expo/vector-icons';

export const MonthlyHeader: FC<IMonthlyHeader_Props> = ({ title, leftButtonTitle, navigation }) => {
  return (
    <View style={styles.header}>
      <View style={styles.container}>
        <TouchableWithoutFeedback style={styles.defaultBlock} onPress={() => navigation.pop()}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableWithoutFeedback>
        <View style={[styles.defaultBlock]}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 120,
    width: '100%',
    borderWidth: 1,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 85,
    padding: 5,
  },
  defaultBlock: {
    flex: 1,
    backgroundColor: 'red',
  },
  headerTitle: {
    fontSize: 20,
  },
});

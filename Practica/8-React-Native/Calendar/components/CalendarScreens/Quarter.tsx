import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { IQuarter_Props } from '../../interfaces';
import { View } from '../ThemesAndStyles/Themed';
import { Month } from './Month';

export const Quarter: FC<IQuarter_Props> = ({ quarter }) => {
  const renderItem = (month: number, index: number) => {
    return <Month monthNumber={month} key={String(index)} />;
  };

  return (
    <View style={styles.container}>
      {quarter.map((month, index) => {
        return <Month monthNumber={month} key={String(index)} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 145,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

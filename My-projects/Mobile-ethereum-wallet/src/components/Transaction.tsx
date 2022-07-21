import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IDataTransaction } from '../zustand/interfaces';

interface ITransactionProps {
  data: IDataTransaction;
}

export const Transaction: React.VFC<ITransactionProps> = ({ data }) => {
  const { from, to, value } = data;

  return (
    <View style={styles.container}>
      <Text style={[styles.columnName, { flexGrow: 3 }]} numberOfLines={1}>
        {from}
      </Text>
      <Text style={[styles.columnName, { flexGrow: 3 }]} numberOfLines={1}>
        {to}
      </Text>
      <Text
        style={[
          styles.columnName,
          {
            flexGrow: 1.5,
          },
        ]}
        numberOfLines={1}
      >
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  columnName: {
    flex: 1,
    color: 'white',
    fontWeight: '500',
    paddingHorizontal: 10,
  },
});

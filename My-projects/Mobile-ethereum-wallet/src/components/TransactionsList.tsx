import React, { useCallback, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import shallow from 'zustand/shallow';
import { IDataTransaction } from '../zustand/interfaces';
import { useStore } from '../zustand/useStore';
import { Transaction } from './Transaction';

export const TransactionsList: React.VFC = () => {
  const { transactions, transactionCount, isPendingTransaction } = useStore(
    ({ transactions, transactionCount, isPendingTransaction }) => ({ transactions, transactionCount, isPendingTransaction }),
    shallow
  );

  const renderItem = useCallback((data: IDataTransaction, index) => <Transaction data={data} key={index} />, [transactions]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>

      <Text style={[styles.latestTransactions, { color: isPendingTransaction ? 'lime' : 'white' }]}>
        Transactions pending: {isPendingTransaction ? 1 : 0}
      </Text>

      <Text style={styles.latestTransactions}>
        Latest {transactions.length} from a total of {transactionCount} transactions
      </Text>

      <View style={styles.columNames}>
        <Text style={[styles.columnName, { flexGrow: 3 }]}>From</Text>
        <Text style={[styles.columnName, { flexGrow: 3 }]}>To</Text>
        <Text style={[styles.columnName, { flexGrow: 1.5 }]}>Value</Text>
      </View>

      <View>{transactions.map(renderItem)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'coral',
    padding: 20,
    borderRadius: 20,
    marginBottom: 30,
  },
  title: {
    color: 'white',
    paddingBottom: 30,
    fontSize: 16,
    fontWeight: '800',
  },
  latestTransactions: {
    color: 'white',
    fontWeight: '600',
    paddingBottom: 15,
  },
  columNames: {
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'lightskyblue',
    borderTopColor: 'grey',
    borderBottomColor: 'grey',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  columnName: {
    flex: 1,
    paddingHorizontal: 10,
    fontWeight: '700',
  },
});

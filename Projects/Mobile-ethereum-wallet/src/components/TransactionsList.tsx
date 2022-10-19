import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import shallow from 'zustand/shallow';
import { StyledCardTitle, StyledColumn, StyledText } from '../styledComponents';
import { IDataTransaction } from '../zustand/interfaces';
import { useStore } from '../zustand/useStore';
import { Transaction } from './Transaction';

export const TransactionsList: React.VFC = () => {
  const { transactions, transactionCount, isPendingTransaction } = useStore(
    ({ transactions, transactionCount, isPendingTransaction }) => ({
      transactions,
      transactionCount,
      isPendingTransaction,
    }),
    shallow
  );

  const renderItem = useCallback(
    (data: IDataTransaction, index) => <Transaction data={data} key={index} />,
    [transactions]
  );

  return (
    <View style={styles.container}>
      <StyledCardTitle>Transactions</StyledCardTitle>

      <StyledText color={isPendingTransaction ? 'lime' : 'white'} fontWeight={600} mb={15}>
        Transactions pending: {isPendingTransaction ? 1 : 0}
      </StyledText>

      <StyledText color={'white'} fontWeight={600} mb={15}>
        Latest {transactions.length} from a total of {transactionCount} transactions
      </StyledText>

      <View style={styles.columnNames}>
        <StyledColumn flexGrow={3} header>
          From
        </StyledColumn>
        <StyledColumn flexGrow={3} header>
          To
        </StyledColumn>
        <StyledColumn flexGrow={1.5} header>
          Value
        </StyledColumn>
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
  columnNames: {
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'lightskyblue',
    borderTopColor: 'grey',
    borderBottomColor: 'grey',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
});

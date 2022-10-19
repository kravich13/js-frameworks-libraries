import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StyledColumn } from '../styledComponents';
import { IDataTransaction } from '../zustand/interfaces';

interface ITransactionProps {
  data: IDataTransaction;
}

export const Transaction: React.VFC<ITransactionProps> = ({ data }) => {
  const { from, to, value } = data;

  return (
    <View style={styles.container}>
      <StyledColumn flexGrow={3} numberOfLines={1}>
        {from}
      </StyledColumn>
      <StyledColumn flexGrow={3} numberOfLines={1}>
        {to}
      </StyledColumn>
      <StyledColumn flexGrow={1.5} numberOfLines={1}>
        {value}
      </StyledColumn>
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
});

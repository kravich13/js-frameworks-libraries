import React, { useCallback, useEffect } from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import shallow from 'zustand/shallow';
import { SendCoin } from '../components/SendCoin';
import { TransactionsList } from '../components/TransactionsList';
import { WalletInfo } from '../components/WalletInfo';
import { RootStackScreenProps } from '../types';
import { useStore } from '../zustand/useStore';

export const WalletDataScreen: React.VFC<RootStackScreenProps<'WalletData'>> = ({
  navigation,
  route,
}) => {
  const { address, refreshing, getBalance, onRefresh, getTransactions } = useStore(
    ({ address, refreshing, getBalance, onRefresh, getTransactions }) => ({
      address,
      refreshing,
      getBalance,
      onRefresh,
      getTransactions,
    }),
    shallow
  );

  const onRefreshControl = useCallback(async () => {
    await onRefresh(address);
  }, [address]);

  useEffect(() => {
    (async () => {
      await Promise.all([getBalance(address), getTransactions(address)]);
    })();
  }, [address]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshControl} />}
    >
      <WalletInfo />

      <SendCoin />

      <TransactionsList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 30,
  },
  text: {
    color: 'white',
  },
  card: {
    width: '83%',
    backgroundColor: 'crimson',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 20,
    marginBottom: 30,
  },
});

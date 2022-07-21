import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Web3 from 'web3';
import shallow from 'zustand/shallow';
import { useStore } from '../zustand/useStore';

export const SendCoin: React.VFC = () => {
  const { address, balance, isPendingTransaction, sendTransaction } = useStore(
    ({ address, balance, isPendingTransaction, sendTransaction }) => ({
      address,
      balance,
      isPendingTransaction,
      sendTransaction,
    }),
    shallow
  );

  const [balanceValue, setBalanceValue] = useState('');
  const [addressValue, setAddressValue] = useState('0x9436Abe4c912dEE8b93834C772E9869bdb0Ee66A');

  const isCorrectInputBalance = useMemo(() => balanceValue !== '' && Number(balanceValue) > 0, [balanceValue]);
  const isCorrectBalance = useMemo(() => balance > 0 && isCorrectInputBalance, [balance, isCorrectInputBalance, balanceValue]);
  const isValidAddress = useMemo(() => Web3.utils.isAddress(addressValue), [addressValue]);
  const isSendDisabled = useMemo(
    () => !(isCorrectBalance && isValidAddress) || isPendingTransaction,
    [isCorrectBalance, isValidAddress, isPendingTransaction]
  );

  const onSendHandler = useCallback(() => {
    sendTransaction(address, addressValue, balanceValue);
  }, [address, addressValue, balanceValue]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send</Text>

      <View style={{ marginBottom: 20 }}>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.balance}>Balance: {balance}</Text>
          <TextInput
            style={styles.textInput}
            value={balanceValue}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="numbers-and-punctuation"
            placeholder="0"
            onChangeText={setBalanceValue}
          />
          {!isCorrectBalance && <Text style={styles.notEnoughAndInvalidAddress}>Not enough balance to send!</Text>}
        </View>

        <View style={{ marginBottom: 10 }}>
          <TextInput
            style={styles.textInput}
            value={addressValue}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="To Address"
            onChangeText={setAddressValue}
          />
          {!isValidAddress && <Text style={styles.notEnoughAndInvalidAddress}>Invalid address</Text>}
        </View>
      </View>

      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity
          style={[styles.buttonContainer, { backgroundColor: isSendDisabled ? 'dimgray' : 'white' }]}
          disabled={isSendDisabled}
          onPress={onSendHandler}
        >
          <Text style={[styles.buttonText, { color: isSendDisabled ? 'lightgrey' : 'crimson' }]}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'cornflowerblue',
    padding: 20,
    borderRadius: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    color: 'white',
    marginBottom: 40,
    fontWeight: '800',
  },
  balance: {
    color: 'white',
    fontWeight: '600',
    marginBottom: 5,
  },
  notEnoughAndInvalidAddress: {
    color: 'red',
    textShadowColor: 'white',
    textShadowRadius: 10,
    fontWeight: '600',
    marginTop: 5,
  },
  textInput: {
    borderRadius: 7,
    backgroundColor: 'white',
    padding: 10,
  },
  buttonText: {
    borderRadius: 20,
    color: 'crimson',
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: 'white',
    width: 100,
    borderRadius: 13,
  },
});

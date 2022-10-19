import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Web3 from 'web3';
import shallow from 'zustand/shallow';
import {
  StyledCardTitle,
  StyledText,
  StyledTouchableOpacity,
  StyledWrongInputText,
} from '../styledComponents';
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

  const isCorrectInputBalance = useMemo(
    () => balanceValue !== '' && Number(balanceValue) > 0,
    [balanceValue]
  );
  const isCorrectBalance = useMemo(
    () => balance > 0 && isCorrectInputBalance,
    [balance, isCorrectInputBalance, balanceValue]
  );
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
      <StyledCardTitle>Send</StyledCardTitle>

      <View style={{ marginBottom: 20 }}>
        <View style={{ marginBottom: 20 }}>
          <StyledText color={'white'} fontWeight={600} mb={10}>
            Balance: {balance}
          </StyledText>

          <TextInput
            style={styles.textInput}
            value={balanceValue}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="numbers-and-punctuation"
            placeholder="0"
            onChangeText={setBalanceValue}
          />
          {!isCorrectBalance && (
            <StyledWrongInputText>Not enough balance to send!</StyledWrongInputText>
          )}
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
          {!isValidAddress && <StyledWrongInputText>Invalid address</StyledWrongInputText>}
        </View>
      </View>

      <View style={{ alignItems: 'center' }}>
        <StyledTouchableOpacity
          background={isSendDisabled ? 'dimgray' : 'white'}
          width={100}
          borderRadius={13}
          disabled={isSendDisabled}
          onPress={onSendHandler}
        >
          <StyledText
            color={isSendDisabled ? 'lightgrey' : 'crimson'}
            padding={'10px 0 10px 0'}
            textAlign={'center'}
            fontSize={18}
            fontWeight={800}
          >
            Send
          </StyledText>
        </StyledTouchableOpacity>
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
  textInput: {
    borderRadius: 7,
    backgroundColor: 'white',
    padding: 10,
  },
});

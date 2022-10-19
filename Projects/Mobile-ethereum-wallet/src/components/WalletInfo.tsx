import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import React, { useCallback } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import shallow from 'zustand/shallow';
import { StyledText, StyledTouchableOpacity } from '../styledComponents';
import { useStore } from '../zustand/useStore';

export const WalletInfo: React.VFC = () => {
  const { address, balance } = useStore(({ address, balance }) => ({ address, balance }), shallow);

  const onPressCopy = useCallback(async () => {
    await Clipboard.setStringAsync(address);

    Alert.alert(`Copied ${address} successfully!`);
  }, [address]);

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <StyledText color={'white'} fontSize={16}>
          MY PERSONAL ACCOUNT
        </StyledText>

        <StyledText
          color={'gainsboro'}
          fontSize={12}
          width={'30%'}
          numberOfLines={1}
          lineBreakMode="middle"
        >
          {address}
        </StyledText>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <StyledText color={'white'} fontSize={16}>
          {balance} ETH
        </StyledText>

        <StyledTouchableOpacity
          borderRadius={15}
          background={'rgba(255,255,255, 0.3)'}
          onPress={onPressCopy}
        >
          <Ionicons name="copy" size={22} color="white" style={{ padding: 10 }} />
        </StyledTouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '83%',
    backgroundColor: 'crimson',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 20,
    marginBottom: 30,
  },
});

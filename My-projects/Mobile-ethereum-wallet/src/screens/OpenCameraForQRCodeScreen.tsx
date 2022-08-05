import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import shallow from 'zustand/shallow';
import { StyledText } from '../styledComponents';
import { RootStackScreenProps } from '../types';
import { useStore } from '../zustand/useStore';

export const OpenCameraForQRCodeScreen: React.VFC<RootStackScreenProps<'Main'>> = ({
  navigation,
  route,
}) => {
  const { privateKey, setPrivateKey } = useStore(
    ({ privateKey, setPrivateKey }) => ({ privateKey, setPrivateKey }),
    shallow
  );

  const [hasPermission, setHasPermission] = useState<Boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // useEffect(() => {
  //   if (privateKey) {
  //     navigation.navigate('WalletData');
  //   }
  // }, [privateKey]);

  const handleBarCodeScanned = useCallback(async ({ type, data }) => {
    setScanned(true);

    setPrivateKey(data);
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Button
        title="Go to WalletData"
        onPress={() => {
          navigation.navigate('WalletData');
        }}
      />

      {/* <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />

      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

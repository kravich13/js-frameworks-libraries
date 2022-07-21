import React, { useCallback } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../../zustand/useStore';

interface IHeaderLeftProps {
  headerTintColor: string;
}

export const HeaderLeft: React.VFC<IHeaderLeftProps> = ({ headerTintColor }) => {
  const { resetPrivateKey } = useStore(({ resetPrivateKey }) => ({ resetPrivateKey }));

  const navigation = useNavigation();

  const handlerPress = useCallback(() => {
    resetPrivateKey();

    navigation.goBack();
  }, [navigation]);

  return (
    <TouchableOpacity style={styles.container} onPress={handlerPress}>
      <AntDesign name="left" size={24} color="crimson" />
      <Text style={[styles.text, { color: headerTintColor }]}>Back to QR</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});

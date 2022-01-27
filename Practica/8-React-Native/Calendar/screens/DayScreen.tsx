import React, { FC } from 'react';
import { Text, View } from '../components/ThemesAndStyles';
import { globalStyles } from '../globalStyles';
import { RootStackScreenProps } from '../types';

export const DayScreen: FC<RootStackScreenProps<'Day'>> = ({ route, navigation }) => {
  return (
    <View style={[globalStyles.container]}>
      <Text onPress={() => navigation.setOptions({ title: 'QQQ' })}>QQ</Text>
    </View>
  );
};

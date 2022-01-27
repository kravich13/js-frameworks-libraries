import { DateTime } from 'luxon';
import React, { FC, useLayoutEffect } from 'react';
import { Text, View } from '../components/ThemesAndStyles';
import { globalStyles } from '../globalStyles';
import { RootStackScreenProps } from '../types';

export const DayScreen: FC<RootStackScreenProps<'Day'>> = ({ route, navigation }) => {
  const { selectedDate } = route.params;

  const dateTime = DateTime.fromMillis(selectedDate);

  useLayoutEffect(() => {
    navigation.setOptions({ headerBackTitle: dateTime.monthLong });
  }, []);

  return (
    <View style={[globalStyles.container]}>
      <Text onPress={() => navigation.setOptions({ title: 'QQQ' })}>QQ</Text>
    </View>
  );
};

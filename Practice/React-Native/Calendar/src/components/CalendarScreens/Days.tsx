import _ from 'lodash';
import React, { FC, memo, useCallback, useMemo } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { IDays_Props, IMonthOrDay_State } from '../../interfaces';
import { Day } from './Day';

const MemoDays: FC<IDays_Props> = ({ days, littleDay }) => {
  const lastDaysWeeks = useMemo(() => _.range(7, days.length + 1, 7), [days.length]);

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<IMonthOrDay_State>) => {
      return (
        <Day
          fullDate={item.fullDate}
          littleDay={littleDay}
          dayOff={lastDaysWeeks.includes(index + 1) || lastDaysWeeks.includes(index + 2)}
        />
      );
    },
    [littleDay, lastDaysWeeks]
  );

  const keyExtractor = useCallback((item: IMonthOrDay_State) => item.id, []);

  return <FlatList key={'_'} data={days} renderItem={renderItem} keyExtractor={keyExtractor} numColumns={7} />;
};

export const Days = memo(MemoDays);

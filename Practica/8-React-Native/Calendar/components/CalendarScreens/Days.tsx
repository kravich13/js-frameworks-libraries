import _ from 'lodash';
import React, { FC, memo, useCallback, useMemo } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { IDays_Props, IMonth_DayState } from '../../interfaces';
import { Day } from './Day';

const MemoDays: FC<IDays_Props> = ({ days, isCurrentMonth, littleDay }) => {
  const lastDaysWeeks = useMemo(() => _.range(7, days.length + 1, 7), [days.length]);

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<IMonth_DayState>) => {
      return (
        <Day
          day={item.day}
          isCurrentMonth={isCurrentMonth}
          littleDay={littleDay}
          dayOff={lastDaysWeeks.includes(index + 1) || lastDaysWeeks.includes(index + 2)}
        />
      );
    },
    [isCurrentMonth, littleDay, lastDaysWeeks]
  );

  const keyExtractor = useCallback((item: IMonth_DayState) => item.id, []);

  return <FlatList key={'_'} data={days} renderItem={renderItem} keyExtractor={keyExtractor} numColumns={7} />;
};

export const Days = memo(MemoDays);

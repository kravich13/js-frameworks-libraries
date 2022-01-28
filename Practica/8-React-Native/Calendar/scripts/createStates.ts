import { DateTime } from 'luxon';
import { IMonthOrDay_State } from '../interfaces';
import { nanoid } from './createNanoid';

export const monthState = (year: number, firstMonth: number, lastMonth: number) => {
  const state: IMonthOrDay_State[] = [];

  for (let i = firstMonth; i <= lastMonth; i++) {
    state.push({ id: nanoid(), fullDate: DateTime.utc(year, i).toMillis() });
  }

  return state;
};

export const daysMonthState = (dateTime: DateTime) => {
  const state: IMonthOrDay_State[] = [];

  const daysInMonth = dateTime.daysInMonth;
  const lastDay = dateTime.weekday + daysInMonth;
  const dayWeekLastDay = dateTime.set({ day: daysInMonth }).weekday;
  const totalNumberDays = 7 - dayWeekLastDay + lastDay - 1;

  let numberDay = 1;

  for (let i = 1; i <= totalNumberDays; i++) {
    if (i >= dateTime.weekday && i < lastDay) {
      state.push({ id: nanoid(), fullDate: dateTime.set({ day: numberDay++ }).toMillis() });
    } else {
      state.push({ id: nanoid(), fullDate: 0 });
    }
  }

  return state;
};

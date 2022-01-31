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

export const numbersWeekState = (dateTime: DateTime) => {
  const day = dateTime.day;
  const weekDay = dateTime.weekday;

  const state: number[] = [];

  let posStart = 1;

  for (let i = 1; i <= 7; i++) {
    if (i < weekDay) {
      state.push(dateTime.minus({ days: weekDay - i }).day);
    } else if (i > weekDay) {
      if (weekDay === 1 || weekDay === 7) {
        state.push(dateTime.plus({ days: i - 1 }).day);
      } else {
        state.push(dateTime.plus({ days: posStart++ }).day);
      }
    } else {
      state.push(day);
    }
  }

  return state;
};

import { DateTime } from 'luxon';
import { nanoid } from './createNanoid';

export const createMonthState = (year: number, firstMonth: number, lastMonth: number) => {
  const state = [];

  for (let i = firstMonth; i <= lastMonth; i++) {
    state.push({ id: nanoid(), fullDate: DateTime.utc(year, i) });
  }

  return state;
};

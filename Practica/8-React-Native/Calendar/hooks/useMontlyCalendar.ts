import _ from 'lodash';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';

export const useMonthlyCalendar = (monthNumber: number) => {
  const [monthlyCalendar, setMonthlyCalendar] = useState<number[][]>([]);

  useEffect(() => {
    const state: number[][] = [[], [], [], [], [], []];

    const firstDate = DateTime.utc(2022, monthNumber, 1);

    const daysInMonth = firstDate.daysInMonth;
    const lastDay = firstDate.weekday + daysInMonth;
    const dayWeekLastDay = firstDate.set({ day: daysInMonth }).weekday;
    const totalNumberDays = 7 - dayWeekLastDay + lastDay;

    let numberDay = 1;
    let indexWeek = 0;

    for (let i = 1; i <= totalNumberDays; i++) {
      if (i >= firstDate.weekday && i < lastDay) {
        if (state[indexWeek].length === 7) {
          state[++indexWeek].push(numberDay++);
        } else {
          state[indexWeek].push(numberDay++);
        }
      } else if (state[indexWeek].length !== 7) {
        state[indexWeek].push(0);
      }
    }

    const readyState = _.filter(state, (week) => week.length) as number[][];

    setMonthlyCalendar(readyState);
  }, [setMonthlyCalendar, DateTime]);

  return monthlyCalendar;
};

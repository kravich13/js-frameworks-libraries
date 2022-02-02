import React from 'react';

export interface IMonth_Props {
  fullDate: number;
  littleMonth: boolean;
}

export interface IMonthName_Props {
  isCurrentMonth: boolean;
  littleMonth: boolean;
  title: string;
  firstDayWeek: number;
}

export interface IDays_Props {
  days: IMonthOrDay_State[];
  littleDay: boolean;
}

export interface IDay_Props {
  fullDate: number;
  littleDay: boolean;
  dayOff: boolean;
}

export interface INumbersWeek_Props {
  fullDate: number;
  setSelectedDate: (clickWeekDay: number) => void;
}

export interface IMonthOrDay_State {
  id: string;
  fullDate: number;
}

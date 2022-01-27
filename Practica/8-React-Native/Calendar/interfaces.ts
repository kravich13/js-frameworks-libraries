import { DateTime } from 'luxon';

export interface IMonth_Props {
  dateTime: DateTime;
  monthNumber: number;
  littleMonth: boolean;
}

export interface IMonthName_Props {
  littleMonth: boolean;
  isCurrentMonth: boolean;
  title: string;
  firstDayWeek: number;
}

export interface IDays_Props {
  days: IMonth_DayState[];
  isCurrentMonth: boolean;
  littleDay: boolean;
}

export interface IDay_Props {
  day: number;
  isCurrentMonth: boolean;
  littleDay: boolean;
  dayOff: boolean;
}

export interface IMonthlyHeader_Props {
  title: string;
  leftButtonTitle?: string;
  navigation: any;
}

export interface IMonth_DayState {
  id: string;
  day: number;
}

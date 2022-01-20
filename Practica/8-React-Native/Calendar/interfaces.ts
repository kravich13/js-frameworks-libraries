import { NavigationProp } from '@react-navigation/native';
import { NativeStackNavigatorProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { RootStackScreenProps } from './types';

export interface IMonth_Props {
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
  days: number[];
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

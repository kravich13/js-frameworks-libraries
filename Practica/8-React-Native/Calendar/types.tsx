import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DateTime } from 'luxon';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: undefined;
  Month: { selectedMonth: number; dateTime: DateTime };
  Days: undefined;
  Day: undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, Screen>;

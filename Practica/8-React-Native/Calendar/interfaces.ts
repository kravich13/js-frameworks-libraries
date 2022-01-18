export interface IMonth_Props {
  monthNumber: number;
  littleMonth: boolean;
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
}

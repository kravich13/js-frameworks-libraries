export interface IQuarter_Props {
  quarter: number[];
}

export interface IMonth_Props {
  monthNumber: number;
}

export interface IWeek_Props {
  week: number[];
  isCurrentMonth: boolean;
}

export interface IDay_Props {
  day: number;
  isCurrentMonth: boolean;
}

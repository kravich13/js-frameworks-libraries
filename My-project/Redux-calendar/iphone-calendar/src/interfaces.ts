interface IContext {
  authorized: boolean
  flagNavbar: boolean
  stateMonth: number
  generalStateMonth: boolean
  clickNavbar: Function
  clickOnMonth: Function
  clickDay: Function
}
interface IMyLogoProps {
  trueNavbar: boolean
}
interface IQuarterProps {
  quarter: number[]
}
interface IMonthProps {
  monthTitle: number
  pressed: boolean
}
interface IWeekProps {
  week: IMonth_objOfDay[]
  propsDay: string
}
interface IDayProps {
  day: IMonth_objOfDay
  openFuncionality: string
}

interface ICalendar_quarters {
  id: number
  month: number[]
}

interface IMonth_stateWeeks {
  id: string
  week: IMonth_objOfDay[]
}
interface IMonth_arrWeeks {
  [key: number]: IMonth_objOfDay[]
}

interface IMonth_objOfDay {
  day: number | string
  currentDay: boolean
}

interface ITaskList_blocksTask {
  id: number
  posTop: number
  posLeft: number
  posHeight: number
}

interface IBlockTask_styles {
  [keys: string]: string
}

interface IBlockTaskProps {
  elem: ITaskList_blocksTask
  blocksTasks: any
  count: number
  addTitle: string
}

interface IFormAddTaskProps {
  formAddTask: any
  addTitle: any
  currentTime: string
  startTask: any
  endTask: any
}
export type {
  IMyLogoProps,
  IQuarterProps,
  IMonthProps,
  IWeekProps,
  IDayProps,
  IBlockTaskProps,
  IFormAddTaskProps,
  ICalendar_quarters,
  IMonth_stateWeeks,
  IMonth_arrWeeks,
  IMonth_objOfDay,
  ITaskList_blocksTask,
  IBlockTask_styles,
  IContext
}

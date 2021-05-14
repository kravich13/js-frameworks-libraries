// ============= Общий стейт всего редьюсера =============
interface ImapDispatchToProps {
  [key: string]: Function
}
interface IMapStateToProps {
  auth: {
    authorized: string
    eventSingUpAuth: string
    navbar: boolean
    monthNumber: number
    clickedMonth: boolean
  }
  tasks: {
    daysTasks: number[]
    tasks: ITaskList_blocksTask[]
    dateClickDay: Date
    notification: string
  }
}

// ============= TaskList =============
interface ITaskList_blocksTask {
  id: number
  timestamp: number
  userName: string
  title: string
  posTop: number
  posLeft: number
  height: number
  position: string
}
interface ITaskList_dynamicPosLeft {
  elem: any
  firstPos: number
  heightBlock: number
}
interface ITaskList_req_blocks {
  id: number
  position: string
  posLeft: number
}
interface ITaskList_req_change {
  userName: string
  tasks: ITaskList_req_blocks[]
}

// ============= Login || Navbar || TransitionTasks =============
interface IComponent_UserAuthorized {
  authorized: string | undefined
}

// ============= Month =============
interface IMonth_DispatchProps {
  change_monthNumber: Function
}
interface IQuarter_passedProps {
  monthNumber: number
}
interface IClickMonth_passedProps extends IQuarter_passedProps {
  clickedMonth?: boolean
  authorized?: string
}
interface IMonth_Moving {
  flag: boolean
}
interface IMonth_objOfDay {
  day: number | string
  fullDate: number | null
  // haveTasks: boolean
}

// ============= BlocksTaskS =============
interface IBlocksTasks_Props {
  blocks: ITaskList_blocksTask[]
  fn_delTask: Function
}

// ============= BlockTask =============
interface IBlockTask_DispatchProps {
  deleteTask: Function
}
interface IBlockTask_Props {
  block: ITaskList_blocksTask
  fn_delTask: Function
}

// ============= Day =============
interface IDayProps {
  elem: IMonth_objOfDay
  authorized: string | undefined
  classTD: string
  setDate_Day: Function
}
interface IDay_DispatchProps {
  setDate_Day: Function
}

interface IFormAddTaskProps {
  formAddTask: any
  addTitle: any
  currentTime: string
  startTask: any
  endTask: any
}

interface IMyLogoProps {
  trueNavbar: boolean
}
interface IQuarterProps {
  quarter: number[]
}

interface IWeekProps {
  week: IMonth_objOfDay[]
  authorized: string | undefined
  classTD: string
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

interface IBlockTask_styles {
  [keys: string]: string
}

export type {
  IMapStateToProps,
  ImapDispatchToProps,
  IComponent_UserAuthorized,
  IMyLogoProps,
  IQuarterProps,
  IMonth_DispatchProps,
  IClickMonth_passedProps,
  IMonth_Moving,
  ITaskList_blocksTask,
  ITaskList_req_change,
  IBlocksTasks_Props,
  IBlockTask_DispatchProps,
  IBlockTask_Props,
  IWeekProps,
  IDayProps,
  IDay_DispatchProps,
  IFormAddTaskProps,
  ICalendar_quarters,
  IMonth_stateWeeks,
  IMonth_arrWeeks,
  IMonth_objOfDay,
  IBlockTask_styles,
  ITaskList_dynamicPosLeft
}

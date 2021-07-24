// ============= Общие стейты =============
interface IAction {
  type: string
  payload: any
}
interface IBlocksTask {
  id: number
  timestamp: number
  userName: string
  title: string
  posTop: number
  posLeft: number
  height: number
  position: string
}
interface IBlockTask {
  id: number
  timestamp: number
  title: string
  posTop: number
  posLeft: number
  height: number
  position: string
}
// ============= tasksReducer =============
interface ITasksReducer_state {
  daysTasks: IObjTasksDays
  tasks: IBlocksTask[]
  dateClickDay: null | string
  birthday: null | string
}
interface IActions_resDayTasks {
  countDays: number[]
  userBirthday: string
}
interface IObjTasksDays {
  [key: number]: number
}
// ============= authReducer =============
interface IAuthReducer_state {
  userName: string
  authorized: string
  navbar: boolean
  monthNumber: number
  clickedMonth: boolean
}
// ============= notificReducer =============
interface INotificReducer_state {
  notification: string
  hiddenAlert: boolean
}
// ============= ations =============
interface ITasks_currentDay {
  userName: string
  timestamp: number
}
interface IRes_createTask {
  message: string
  task: IBlocksTask
}
interface IRes_changeTask {
  id: number
  position: string
  posLeft: number
}
interface ITaskList_req_blocks {
  id: number
  position: string
}
interface ITaskList_req_change {
  userName: string
  tasks: ITaskList_req_blocks[]
}
interface ITaskList_res_change {
  id: number
}
interface IActions_deleteTask {
  userName: string
  task: IBlockTask[]
}
interface IActions_res_dayTasks {
  daysTasks: IObjTasksDays
  userBirthday: null | string
}
interface IActions_req_signUp {
  login: string
  birthday: string
  password: string
  passwordConfirm: string
}
interface IActions_res_signUp {
  message: string
}
interface IActions_req_auth {
  loginValue: string
  passwordValue: string
}
interface IActions_res_auth {
  login: string
  token: string
  message: 'string'
}

export type {
  IAction,
  IBlocksTask,
  ITasksReducer_state,
  IAuthReducer_state,
  INotificReducer_state,
  ITasks_currentDay,
  IRes_createTask,
  IRes_changeTask,
  IActions_res_dayTasks,
  ITaskList_req_change,
  ITaskList_res_change,
  IActions_deleteTask,
  IActions_resDayTasks,
  IObjTasksDays,
  IActions_req_signUp,
  IActions_res_signUp,
  IActions_req_auth,
  IActions_res_auth,
}

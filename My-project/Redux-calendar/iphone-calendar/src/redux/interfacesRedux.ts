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
  daysTasks: number[]
  tasks: IBlocksTask[]
  dateClickDay: null | number
  notification: string
}
// ============= authReducer =============
interface IAuthReducer_state {
  eventSingUpAuth: string
  authorized: string
  navbar: boolean
  monthNumber: number
  clickedMonth: boolean
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
interface IActions_req_singUp {
  login: string
  birthday: string
  password: string
  passwordConfirm: string
}
interface IActions_res_singUp {
  message: string
}
interface IActions_req_auth {
  name: string
  password: string
}
interface IActions_res_auth {
  login: string
  message: 'string'
}

export type {
  IAction,
  IBlocksTask,
  ITasksReducer_state,
  IAuthReducer_state,
  ITasks_currentDay,
  IRes_createTask,
  IRes_changeTask,
  ITaskList_req_change,
  ITaskList_res_change,
  IActions_deleteTask,
  IActions_req_singUp,
  IActions_res_singUp,
  IActions_req_auth,
  IActions_res_auth
}

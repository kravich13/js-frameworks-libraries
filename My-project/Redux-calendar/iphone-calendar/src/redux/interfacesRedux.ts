// ============= Общие стейты =============
interface IAction {
  type: string
  payload: any
}
interface IBlocksTask {
  id: number
  title: string
  posTop: number
  posLeft: number
  height: number
  position: string
}

// ============= tasksReducer =============
interface ITasksReducer_state {
  tasks: IBlocksTask[]
  dateClickDay: null | number
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
interface IActions_changeTask {
  id: number
  position: string
}
interface IActions_deleteTask {
  id: number
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
  IActions_changeTask,
  IActions_deleteTask,
  IActions_req_singUp,
  IActions_res_singUp,
  IActions_req_auth,
  IActions_res_auth
}

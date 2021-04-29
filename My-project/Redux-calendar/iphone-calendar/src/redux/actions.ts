import {
  CHANGE_TASK,
  CREATE_TASK,
  DELETE_TASK,
  SING_UP,
  AUTOLOGIN,
  HIDDEN_NAVBAR,
  MONTH_NUMBER,
  CLICK_MONTH,
  DATA_CLICK_DAY,
  LOG_OUT,
  TASKS_CURRENT_DAY,
  NOTIFICATION_CLEAR
} from './types'
import {
  IBlocksTask,
  ITasks_currentDay,
  IActions_deleteTask,
  IActions_req_singUp,
  IActions_res_singUp,
  IAction,
  IActions_req_auth,
  IActions_res_auth,
  IRes_createTask,
  IRes_changeTask,
  ITaskList_req_change,
  ITaskList_res_change
} from './interfacesRedux'

export function clear_nofificationTasks(task: string = ''): IAction {
  return {
    type: NOTIFICATION_CLEAR,
    payload: task
  }
}
export function tasks_currentDay(task: ITasks_currentDay): Function {
  return async (dispatch: Function) => {
    const res = await fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Action-type': 'allTasks'
      },
      body: JSON.stringify(task)
    })
    const json: IBlocksTask = await res.json()
    dispatch({ type: TASKS_CURRENT_DAY, payload: json })
  }
}

export function createTask(task: IBlocksTask): Function {
  return async (dispatch: Function) => {
    const res = await fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Action-type': 'createTask'
      },
      body: JSON.stringify(task)
    })
    const json: IRes_createTask = await res.json()

    dispatch({ type: CREATE_TASK, payload: json })
  }
}

export function changeTask(task: ITaskList_req_change): Function {
  return async (dispatch: Function) => {
    const res = await fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Action-type': 'changeTask'
      },
      body: JSON.stringify(task)
    })
    const json: IRes_changeTask[] = await res.json()

    dispatch({ type: CHANGE_TASK, payload: json })
  }
}

export function deleteTask(task: IActions_deleteTask): Function {
  return async (dispatch: Function) => {
    const res = await fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Action-type': 'deleteTask'
      },
      body: JSON.stringify(task)
    })
    const json: ITaskList_res_change = await res.json()

    dispatch({ type: DELETE_TASK, payload: json })
  }
}

export function req_singUp(task: IActions_req_singUp): Function {
  return async (dispatch: Function) => {
    const res = await fetch('/sing-up', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const json: IActions_res_singUp = await res.json()

    dispatch({ type: SING_UP, payload: json.message })
  }
}

export function req_auth(task: IActions_req_auth): Function {
  return async (dispatch: Function) => {
    const res = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const json: IActions_res_auth = await res.json()

    dispatch({ type: AUTOLOGIN, payload: json })
  }
}

export function log_out(task: string = ''): IAction {
  return {
    type: LOG_OUT,
    payload: task
  }
}

export function req_clearMessage(task: string): IAction {
  return {
    type: SING_UP,
    payload: task
  }
}

export function hidden_navbar(task: boolean): IAction {
  return {
    type: HIDDEN_NAVBAR,
    payload: task
  }
}

export function change_monthNumber(task: number): IAction {
  return {
    type: MONTH_NUMBER,
    payload: task
  }
}

export function click_Month(task: number): IAction {
  return {
    type: CLICK_MONTH,
    payload: task
  }
}

export function setDate_Day(task: Date): IAction {
  return {
    type: DATA_CLICK_DAY,
    payload: task
  }
}

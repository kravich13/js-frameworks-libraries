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
  LOG_OUT
} from './types'
import {
  IBlocksTask,
  IActions_changeTask,
  IActions_deleteTask,
  IActions_req_singUp,
  IActions_res_singUp,
  IAction,
  IActions_req_auth,
  IActions_res_auth
} from './interfacesRedux'

export function createTask(task: IBlocksTask): IAction {
  return {
    type: CREATE_TASK,
    payload: task
  }
}

export function changeTask(task: IActions_changeTask): IAction {
  return {
    type: CHANGE_TASK,
    payload: task
  }
}

export function deleteTask(task: IActions_deleteTask): IAction {
  return {
    type: DELETE_TASK,
    payload: task
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

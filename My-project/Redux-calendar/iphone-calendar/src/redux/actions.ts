import {
  CHANGE_TASK,
  CREATE_TASK,
  DELETE_TASK,
  SING_UP,
  AUTOLOGIN,
  HIDDEN_NAVBAR,
  MONTH_NUMBER,
  CLICK_MONTH
} from './types'

export function createTask(task: any) {
  return {
    type: CREATE_TASK,
    payload: task
  }
}

export function changeTask(task: any) {
  return {
    type: CHANGE_TASK,
    payload: task
  }
}

export function deleteTask(task: any) {
  return {
    type: DELETE_TASK,
    payload: task
  }
}

export function req_singUp(task: any) {
  return async (dispatch: any) => {
    const res = await fetch('/sing-up', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const json = await res.json()

    dispatch({ type: SING_UP, payload: json })
  }
}

export function req_auth(task: any) {
  return async (dispatch: any) => {
    const res = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const json = await res.json()

    dispatch({ type: AUTOLOGIN, payload: json })
  }
}

export function req_clearMessage(task: any) {
  return {
    type: SING_UP,
    payload: task
  }
}

export function hidden_navbar(task: any) {
  return {
    type: HIDDEN_NAVBAR,
    payload: task
  }
}

export function change_monthNumber(task: any) {
  return {
    type: MONTH_NUMBER,
    payload: task
  }
}

export function click_Month(task: any) {
  return {
    type: CLICK_MONTH,
    payload: task
  }
}

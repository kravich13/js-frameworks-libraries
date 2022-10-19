import {
  CHANGE_TASK,
  CREATE_TASK,
  DELETE_TASK,
  LOGIN_OR_SINGUP,
  HIDDEN_NAVBAR,
  MONTH_NUMBER,
  CLICK_MONTH,
  DATA_CLICK_DAY,
  LOG_OUT,
  TASKS_CURRENT_DAY,
  DAYS_TASKS,
  CHANGE_NOTIFIC,
  HIDDEN_NOTIFIC,
} from './types'
import {
  IBlocksTask,
  ITasks_currentDay,
  IActions_deleteTask,
  IActions_req_signUp,
  IAction,
  IActions_req_auth,
  IActions_res_auth,
  IRes_createTask,
  IRes_changeTask,
  ITaskList_req_change,
  ITaskList_res_change,
  IActions_resDayTasks,
  IActions_res_dayTasks,
  IObjTasksDays,
} from './interfacesRedux'

let timerID: ReturnType<typeof setTimeout>

export function hidden_alert(task: boolean): IAction {
  return { type: HIDDEN_NOTIFIC, payload: task }
}

export function change_notific(task: string = ''): IAction {
  return { type: CHANGE_NOTIFIC, payload: task }
}

export function actions_withAlert(message: string): Function {
  return (dispatch: Function): void => {
    // Default
    clearTimeout(timerID)
    dispatch(change_notific(''))
    dispatch(hidden_alert(false))

    // Show and hide the alert
    dispatch(change_notific(message))
    dispatch(hidden_alert(true))
    timerID = setTimeout(() => dispatch(hidden_alert(false)), 3000)
  }
}

export function tasks_currentDay(task: ITasks_currentDay): Function {
  return async (dispatch: Function): Promise<void> => {
    try {
      const res = await fetch('/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Action-type': 'allTasks',
        },
        body: JSON.stringify(task),
      })
      const json: IBlocksTask = await res.json()
      dispatch({ type: TASKS_CURRENT_DAY, payload: json })
    } catch (err) {
      dispatch(change_notific('Возникла ошибка при загрузке'))
    }
  }
}

export function createTask(task: IBlocksTask): Function {
  return async (dispatch: Function): Promise<void> => {
    try {
      const res = await fetch('/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Action-type': 'createTask',
        },
        body: JSON.stringify(task),
      })
      const json: IRes_createTask = await res.json()

      dispatch({ type: CREATE_TASK, payload: json.task })
      dispatch(actions_withAlert(json.message))
    } catch (err) {
      dispatch(actions_withAlert('Возникла ошибка при создании'))
    }
  }
}

export function changeTask(task: ITaskList_req_change): Function {
  return async (dispatch: Function): Promise<void> => {
    try {
      const res = await fetch('/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Action-type': 'changeTask',
        },
        body: JSON.stringify(task),
      })
      const json: IRes_changeTask[] = await res.json()

      dispatch({ type: CHANGE_TASK, payload: json })
    } catch (err) {
      dispatch(actions_withAlert('Возникла ошибка при изменении'))
    }
  }
}

export function deleteTask(task: IActions_deleteTask): Function {
  return async (dispatch: Function): Promise<void> => {
    try {
      const res = await fetch('/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Action-type': 'deleteTask',
        },
        body: JSON.stringify(task),
      })
      const json: ITaskList_res_change = await res.json()

      dispatch({ type: DELETE_TASK, payload: json })
      dispatch(actions_withAlert('Блок успешно удалён'))
    } catch (err) {
      dispatch(actions_withAlert('Возникла ошибка при удалении'))
    }
  }
}

export function req_daysTasks(task: string) {
  return async (dispatch: Function): Promise<void> => {
    try {
      const res = await fetch('/daysTasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ user: task }),
      })
      const json: IActions_resDayTasks = await res.json()

      const objTasksDays: IObjTasksDays = {}
      json.countDays.forEach((elem) => (objTasksDays[elem] = elem))

      dispatch(
        res_daysTasks({
          daysTasks: objTasksDays,
          userBirthday: json.userBirthday,
        })
      )
    } catch (err) {
      dispatch(res_daysTasks())
    }
  }
}

export function res_daysTasks(data: IActions_res_dayTasks | null = null) {
  return {
    type: DAYS_TASKS,
    payload: {
      daysTasks: !data ? {} : data.daysTasks,
      userBirthday: !data ? data : data.userBirthday,
    },
  }
}

export function req_signUp(task: IActions_req_signUp): Function {
  return async (dispatch: Function): Promise<void> => {
    try {
      const res = await fetch('/sign-up', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(task),
      })
      const json: IActions_res_auth = await res.json()
      const { login, token, message } = json

      dispatch({ type: LOGIN_OR_SINGUP, payload: { login, token } })

      dispatch(actions_withAlert(message))
    } catch (err) {
      dispatch(actions_withAlert('Возникла ошибка при отправке данных'))
    }
  }
}

export function req_auth(task: IActions_req_auth): Function {
  return async (dispatch: Function): Promise<void> => {
    try {
      const { loginValue: name, passwordValue: password } = task

      const res = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      })
      const json: IActions_res_auth = await res.json()

      const { login, token, message } = json

      dispatch({ type: LOGIN_OR_SINGUP, payload: { login, token } })
      dispatch(actions_withAlert(message))
    } catch (err) {
      dispatch(actions_withAlert('Возникла ошибка при авторизации'))
    }
  }
}

export function log_out(task: string): Function {
  return (dispatch: Function): void => {
    dispatch({ type: LOG_OUT, payload: '' })
    dispatch(actions_withAlert(task))
  }
}

export function req_clearMessage(task: string): IAction {
  return {
    type: LOGIN_OR_SINGUP,
    payload: { message: task, login: '', token: '' },
  }
}

export function hidden_navbar(task: boolean): IAction {
  return { type: HIDDEN_NAVBAR, payload: task }
}

export function change_monthNumber(task: number): IAction {
  return { type: MONTH_NUMBER, payload: task }
}

export function click_Month(task: number): IAction {
  return { type: CLICK_MONTH, payload: task }
}

export function setDate_Day(task: Date): IAction {
  return { type: DATA_CLICK_DAY, payload: task }
}

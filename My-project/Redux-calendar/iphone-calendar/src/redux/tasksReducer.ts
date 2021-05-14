import {
  CHANGE_TASK,
  CREATE_TASK,
  DATA_CLICK_DAY,
  DAYS_TASKS,
  DELETE_TASK,
  NOTIFICATION_CLEAR,
  TASKS_CURRENT_DAY
} from './types'
import {
  ITasksReducer_state,
  IAction,
  IBlocksTask,
  IRes_changeTask,
  IRes_createTask
} from './interfacesRedux'

const initialState: ITasksReducer_state = {
  daysTasks: [],
  tasks: [],
  dateClickDay: null,
  notification: ''
}

export const tasksReducer = (
  state = initialState,
  action: IAction
): ITasksReducer_state => {
  const { type, payload } = action

  switch (type) {
    case NOTIFICATION_CLEAR:
      return { ...state, notification: payload }
    case TASKS_CURRENT_DAY:
      return { ...state, tasks: Array.from(payload) }
    case CREATE_TASK:
      return createTask(state, payload)
    case CHANGE_TASK:
      return changeTask(state, payload)
    case DELETE_TASK:
      return deleteTask(state, payload.id)
    case DATA_CLICK_DAY:
      return { ...state, dateClickDay: payload }
    case DAYS_TASKS:
      return { ...state, daysTasks: Array.from(payload) }
    default:
      return state
  }
}

function createTask(
  state: ITasksReducer_state,
  res: IRes_createTask
): ITasksReducer_state {
  if (!res.task) return { ...state, notification: res.message }

  return {
    ...state,
    tasks: state.tasks.concat(res.task),
    notification: res.message
  }
}

function changeTask(
  state: ITasksReducer_state,
  task: IRes_changeTask[]
): ITasksReducer_state {
  const newTask = state.tasks.map((elem): IBlocksTask => {
    for (const needBlock of task) {
      if (elem.id === needBlock.id) {
        return {
          ...elem,
          position: needBlock.position,
          posLeft: needBlock.posLeft
        }
      }
    }
    return elem
  })
  return { ...state, tasks: newTask }
}

function deleteTask(
  state: ITasksReducer_state,
  id: number
): ITasksReducer_state {
  const newTask = state.tasks.filter((elem): boolean => {
    return elem.id === id ? false : true
  })
  return { ...state, tasks: newTask }
}

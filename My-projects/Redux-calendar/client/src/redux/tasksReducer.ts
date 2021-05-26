import {
  CHANGE_TASK,
  CREATE_TASK,
  DATA_CLICK_DAY,
  DAYS_TASKS,
  DELETE_TASK,
  TASKS_CURRENT_DAY,
} from './types'
import {
  ITasksReducer_state,
  IAction,
  IBlocksTask,
  IRes_changeTask,
} from './interfacesRedux'

const initialState: ITasksReducer_state = {
  daysTasks: [],
  tasks: [],
  dateClickDay: localStorage.getItem('dateClickDay') ?? null,
  birthday: null,
}

export const tasksReducer = (
  state = initialState,
  action: IAction
): ITasksReducer_state => {
  const { type, payload } = action

  switch (type) {
    case TASKS_CURRENT_DAY:
      return { ...state, tasks: Array.from(payload) }
    case CREATE_TASK:
      return createTask(state, payload)
    case CHANGE_TASK:
      return changeTask(state, payload)
    case DELETE_TASK:
      return deleteTask(state, payload.id)
    case DATA_CLICK_DAY:
      localStorage.setItem('dateClickDay', payload)
      return { ...state, dateClickDay: payload }
    case DAYS_TASKS:
      return {
        ...state,
        daysTasks: Array.from(payload.countDays),
        birthday: payload.userBirthday,
      }
    default:
      return state
  }
}

function createTask(
  state: ITasksReducer_state,
  task: IBlocksTask
): ITasksReducer_state {
  if (!task) return state
  return { ...state, tasks: state.tasks.concat(task) }
}

function changeTask(
  state: ITasksReducer_state,
  task: IRes_changeTask[]
): ITasksReducer_state {
  const newTask = state.tasks.map((elem): IBlocksTask => {
    for (const needBlock of task) {
      const { id, position, posLeft } = needBlock

      if (elem.id === id) {
        return { ...elem, position, posLeft }
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

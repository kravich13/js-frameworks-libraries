import { CHANGE_TASK, CREATE_TASK, DATA_CLICK_DAY, DELETE_TASK } from './types'
import { ITasksReducer_state, IAction, IBlocksTask } from './interfacesRedux'

const initialState: ITasksReducer_state = {
  tasks: [],
  dateClickDay: null
}

export const tasksReducer = (
  state = initialState,
  action: IAction
): ITasksReducer_state => {
  const { type, payload } = action

  switch (type) {
    case CREATE_TASK:
      return { ...state, tasks: state.tasks.concat(payload) }
    case CHANGE_TASK:
      return changeTask(state, payload.id)
    case DELETE_TASK:
      return deleteTask(state, payload.id)
    case DATA_CLICK_DAY:
      return { ...state, dateClickDay: payload }
    default:
      return state
  }
}

function changeTask(
  state: ITasksReducer_state,
  id: number
): ITasksReducer_state {
  const newTask = state.tasks.map(
    (elem): IBlocksTask => {
      return elem.id === id ? { ...elem, position: 'left' } : elem
    }
  )
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

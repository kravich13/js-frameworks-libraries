import { CHANGE_TASK, CREATE_TASK, DELETE_TASK } from './types'

const initialState = {
  tasks: [],
  monthInfo: null
}

export const tasksReducer = (state = initialState, action: any) => {
  const { type, payload } = action

  switch (type) {
    case CREATE_TASK:
      return { ...state, tasks: state.tasks.concat(payload) }
    case CHANGE_TASK:
      return changeTask(state, payload.id)
    case DELETE_TASK:
      return deleteTask(state, payload.id)
    default:
      return state
  }
}

function changeTask(state: any, id: number) {
  const newTask = state.tasks.map((elem: any) => {
    return elem.id === id ? { ...elem, position: 'left' } : elem
  })
  return { ...state, tasks: newTask }
}

function deleteTask(state: any, id: number) {
  const newTask = state.tasks.filter((elem: any) => {
    return elem.id === id ? false : true
  })
  return { ...state, tasks: newTask }
}

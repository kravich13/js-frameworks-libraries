import { CREATE_TASK } from './types'

const initialState = {
  tasks: []
}

export const tasksReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CREATE_TASK:
      return { ...state, tasks: state.tasks.concat(action.payload) }
    default:
      return state
  }
}

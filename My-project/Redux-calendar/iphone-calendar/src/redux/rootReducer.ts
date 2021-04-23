import { combineReducers } from 'redux'
import { tasksReducer } from './tasksReducer'
import { authReducer } from './authReducer'

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  auth: authReducer
})

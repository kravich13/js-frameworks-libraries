import { combineReducers } from 'redux'
import { tasksReducer } from './tasksReducer'
import { authReducer } from './authReducer'
import { notificReducer } from './notificReducer'

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  auth: authReducer,
  notific: notificReducer,
})

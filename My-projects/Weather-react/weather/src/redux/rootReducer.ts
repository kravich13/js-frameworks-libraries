import { combineReducers } from 'redux'
import { citiesReducer } from './citiesReducer'

export const rootReducer = combineReducers({ search: citiesReducer })

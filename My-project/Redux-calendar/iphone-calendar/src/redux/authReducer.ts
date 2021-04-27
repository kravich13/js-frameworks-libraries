import {
  SING_UP,
  AUTOLOGIN,
  HIDDEN_NAVBAR,
  MONTH_NUMBER,
  CLICK_MONTH,
  LOG_OUT
} from './types'
import { IAuthReducer_state, IAction } from './interfacesRedux'

const initialState: IAuthReducer_state = {
  eventSingUpAuth: '',
  authorized: '',
  navbar: false,
  monthNumber: new Date().getMonth(),
  clickedMonth: false
}

export const authReducer = (
  state = initialState,
  action: IAction
): IAuthReducer_state => {
  const { type, payload } = action

  switch (type) {
    case SING_UP:
      return { ...state, eventSingUpAuth: payload }
    case AUTOLOGIN:
      return {
        ...state,
        authorized: payload.login,
        eventSingUpAuth: payload.message
      }
    case LOG_OUT: {
      return { ...state, authorized: payload }
    }
    case HIDDEN_NAVBAR:
      return { ...state, navbar: payload }
    case MONTH_NUMBER:
      return { ...state, monthNumber: payload }
    case CLICK_MONTH:
      return { ...state, clickedMonth: payload }
    default:
      return state
  }
}

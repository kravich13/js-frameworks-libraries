import {
  SIGN_UP,
  AUTOLOGIN,
  HIDDEN_NAVBAR,
  MONTH_NUMBER,
  CLICK_MONTH,
  LOG_OUT
} from './types'
import { IAuthReducer_state, IAction } from './interfacesRedux'

const initialState: IAuthReducer_state = {
  eventSignUpAuth: '',
  authorized: localStorage.getItem('userData') ?? '',
  userName: localStorage.getItem('userData')
    ? JSON.parse(localStorage.getItem('userData')!).login
    : '',
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
    case SIGN_UP:
      return { ...state, eventSignUpAuth: payload }
    case AUTOLOGIN:
      localStorage.setItem(
        'userData',
        JSON.stringify({
          login: payload.login,
          token: payload.token
        })
      )
      return {
        ...state,
        authorized: JSON.stringify({
          login: payload.login,
          token: payload.token
        }),
        userName: payload.login,
        eventSignUpAuth: payload.message
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

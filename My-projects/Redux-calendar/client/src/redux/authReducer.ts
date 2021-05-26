import {
  HIDDEN_NAVBAR,
  MONTH_NUMBER,
  CLICK_MONTH,
  LOG_OUT,
  LOGIN_OR_SINGUP,
} from './types'
import {
  IAuthReducer_state,
  IAction,
  IActions_res_auth,
} from './interfacesRedux'

const initialState: IAuthReducer_state = {
  authorized: localStorage.getItem('userData') ?? '',
  userName: localStorage.getItem('userData')
    ? JSON.parse(localStorage.getItem('userData')!).login
    : '',
  navbar: false,
  monthNumber: new Date().getMonth(),
  clickedMonth: false,
}

export const authReducer = (
  state = initialState,
  action: IAction
): IAuthReducer_state => {
  const { type, payload } = action

  switch (type) {
    case LOGIN_OR_SINGUP:
      return login_or_singUp(state, payload)
    case LOG_OUT: {
      localStorage.setItem('userData', '')
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

function login_or_singUp(
  state: IAuthReducer_state,
  payload: IActions_res_auth
): IAuthReducer_state {
  if (!payload.login && !payload.token) return state

  const resToString: string = JSON.stringify({
    login: payload.login,
    token: payload.token,
  })

  localStorage.setItem('userData', resToString)

  return { ...state, authorized: resToString, userName: payload.login }
}

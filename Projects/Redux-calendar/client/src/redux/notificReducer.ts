import { IAction, INotificReducer_state } from './interfacesRedux'
import { CHANGE_NOTIFIC, HIDDEN_NOTIFIC } from './types'

const initialState: INotificReducer_state = {
  notification: '',
  hiddenAlert: false,
}

export const notificReducer = (state = initialState, action: IAction): any => {
  const { type, payload } = action

  switch (type) {
    case HIDDEN_NOTIFIC:
      return { ...state, hiddenAlert: payload }
    case CHANGE_NOTIFIC:
      return { ...state, notification: payload }
    default:
      return state
  }
}

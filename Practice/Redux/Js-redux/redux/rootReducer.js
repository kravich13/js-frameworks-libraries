import { INCREMENT, DECREMENT } from './types.js'

export function counterReducer(state, action) {
  if (action.type === INCREMENT) return state + 1
  else if (action.type === DECREMENT) return state - 1

  return state
}

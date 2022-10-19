export function createStore(rootReducer, initialState) {
  let state = rootReducer(initialState, { type: '__INIT_' })
  const subscribers = []

  return {
    // Что-то произошло
    dispatch(action) {
      state = rootReducer(state, action)
      subscribers.forEach((sub) => sub())
    },
    // Нужно что-то поменять
    subscribe(callback) {
      subscribers.push(callback)
    },
    getState() {
      return state
    }
  }
}

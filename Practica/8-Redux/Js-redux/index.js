import { counterReducer } from './createStore.js'
import { rootReducer } from './redux/rootReducer.js'
import { increment, decrement } from './redux/actions.js'

const $countSpan = document.getElementById('countState')
const $addBtn = document.getElementById('getAdd')
const $takeBtn = document.getElementById('getTake')
const $asyncBtn = document.getElementById('getAsync')
const $themeBtn = document.getElementById('getTheme')

const store = createStore(counterReducer, 0)

$addBtn.addEventListener('click', () => {
  store.dispatch(increment())
})

$takeBtn.addEventListener('click', () => {
  store.dispatch(decrement())
})

$asyncBtn.addEventListener('click', () => {})

$themeBtn.addEventListener('click', () => {
  //   document.body.classList.toggle('dark')
})

store.subscribe(() => {
  const state = store.getState()
  $countSpan.textContent = state
})

store.dispatch({ type: 'INIT_APPLICATION' })

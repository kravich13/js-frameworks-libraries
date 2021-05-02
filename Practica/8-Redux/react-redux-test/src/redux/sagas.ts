import { call, put, takeEvery } from 'redux-saga/effects'
import { FETCH_POSTS, REQUEST_POSTS } from './types'

export interface ResponseGenerator {
  config?: any
  data?: any
  headers?: any
  request?: any
  status?: number
  statusText?: string
}

export function* sagaWatcher() {
  yield takeEvery(REQUEST_POSTS, sagaWorker)
}

function* sagaWorker() {
  const payload: ResponseGenerator = yield call(fetchPosts)
  yield put({ type: FETCH_POSTS, payload })
}
async function fetchPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
  return await res.json()
}

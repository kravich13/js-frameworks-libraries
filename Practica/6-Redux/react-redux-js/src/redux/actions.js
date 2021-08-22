import { CREATE_POST } from './types'
import { FETCH_POST } from './types'

export function createPost(post) {
  return {
    type: CREATE_POST,
    payload: post
  }
}

export function fetchedPosts(post) {
  return (dispatch) => dispatch({ type: FETCH_POST, payload: post })
}

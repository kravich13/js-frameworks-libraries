import { CREATE_POST } from './types'

export function createPost(post: any) {
  return {
    type: CREATE_POST,
    payload: post
  }
}

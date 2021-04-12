import { CREATE_POST } from './types'

export function createPost(post: any) {
  console.log(post)
  return {
    type: CREATE_POST,
    payload: post
  }
}

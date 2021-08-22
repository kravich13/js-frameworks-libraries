import { CREATE_POST, REQUEST_POSTS } from './types'

export function createPost(post: any) {
  return {
    type: CREATE_POST,
    payload: post
  }
}

export function fetchPosts() {
  return {
    type: REQUEST_POSTS
  }
}

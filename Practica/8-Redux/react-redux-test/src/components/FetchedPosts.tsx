import React from 'react'
import { Post } from './Post'

export const FetchedPosts: React.FC<any> = ({ posts }) => {
  if (!posts.length) return <button>Загрузить</button>

  return posts.map((post: any) => <Post post={post} key={post} />)
}

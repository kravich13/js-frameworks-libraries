import React from 'react'
import { Post } from './Post'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../redux/actions'

export const FetchedPosts: React.FC<any> = () => {
  const dispatch = useDispatch()
  const posts = useSelector((state: any) => {
    return state.posts.fetchedPosts
  })

  if (!posts.length) {
    return <button onClick={() => dispatch(fetchPosts())}>Загрузить</button>
  }
  return posts.map((post: any) => <Post post={post} key={post.id} />)
}

import React from 'react'

import { FetchedPosts } from './components/FetchedPosts'
import PostForm from './components/PostForm'
import Posts from './components/Posts'

import './App.css'

export const App: React.FC = () => {
  return (
    <div className="App">
      <div className="form">
        <h1>Форма отправки постов</h1>
        <PostForm />
      </div>
      <div className="posts">
        <div>
          <h1>Синхронные посты</h1>
          <Posts />
        </div>
        <div>
          <h1>Асинхронные посты</h1>
          <FetchedPosts posts={[]} />
        </div>
      </div>
    </div>
  )
}

import React from 'react';
import './App.css';
import { AsyncPosts } from './components/AsyncPosts';
import { PostForm } from './components/PostForm';
import { Posts } from './components/Posts';

function App() {
  return (
    <div className="App">
      <PostForm />
      <Posts />
      <AsyncPosts />
    </div>
  );
}

export default App;

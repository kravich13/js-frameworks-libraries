import './App.css'
import PostForm from './components/PostForm'
import Posts from './components/Posts'
import FetchedPosts from './components/FetchedPosts'

function App() {
  return (
    <div className="App">
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
    </div>
  )
}

export default App

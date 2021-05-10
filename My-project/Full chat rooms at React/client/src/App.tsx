import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import ChatRoom from './pages/Chat-room'
import { Kravich } from './pages/Kravich'
import { MainList } from './pages/Main-list'
import './App.css'
import './styles/list-messages.css'
import './styles/list-rooms.css'
import './styles/chat.css'
import './styles/chat-info.css'
import './styles/navbar.css'
import './styles/footer.css'
import './styles/rooms.css'
import './styles/chat-room.css'

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <section id="main-section">
          <Switch>
            <Route component={MainList} path="/" exact />
            <Route component={ChatRoom} path="/rooms" />
            <Route component={Kravich} path="/kravich" />
          </Switch>
        </section>
        <footer>
          <ul>
            <li>2021</li>
            <li>vladislav.onatskyi@gmail.com</li>
          </ul>
        </footer>
      </BrowserRouter>
    </div>
  )
}

export default App

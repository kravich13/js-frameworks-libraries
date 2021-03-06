import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/Navbar'
import { ChatRoom } from './pages/Chat-room'
import { Kravich } from './pages/Kravich'
import { MainList } from './pages/Main-list'

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
      </BrowserRouter>
    </div>
  )
}

export default App

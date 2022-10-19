import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Context from './Context'
import { Navbar } from './components/Navbar'
import ChatRoom from './pages/Chat-room'
import { Kravich } from './pages/Kravich'
import { MainList } from './pages/Main-list'
import './App.css'
import './styles/footer.css'
import { MobileNavbar } from './components/mobileNavbar'

const App: React.FC = () => {
  const [stateAlert, setStateAlert] = useState<string>('')
  const [hiddenAlert, setHiddenALert] = useState<boolean>(false)

  return (
    <Context.Provider
      value={{ stateAlert, hiddenAlert, setStateAlert, setHiddenALert }}
    >
      <div className="App">
        <BrowserRouter>
          <header>
            <Navbar />
            <MobileNavbar />
          </header>
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
    </Context.Provider>
  )
}

export default App

import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import { NavBar } from './components/Navbar'
import { ListTodo } from './pages/ListTodo'
import { Kravich } from './pages/Kravich'
import { Max } from './pages/Max'

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />

        <Switch>
          <Route component={ListTodo} path="/" exact />
          <Route component={Kravich} path="/kravich" />
          <Route component={Max} path="/max" />
        </Switch>
      </BrowserRouter>
    </div>
  )
}
export default App

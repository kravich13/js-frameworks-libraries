import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/Navbar'
import { Calendar } from './pages/Calendar'
import { Login } from './pages/Login'
import { SingUp } from './pages/Sing-up'
import { ClickMonth } from './pages/ClickMonth'
import { TaskList } from './pages/Task-list'
import Context from './context'

const App: React.FC = () => {
  const [authorized] = useState<boolean>(true)
  const [flagNavbar, setFlagNavbar] = useState<boolean>(false)
  const [stateMonth, setStateMonth] = useState<number>()
  const [generalStateMonth, setGeneralStateMonth] = useState<boolean>(false)

  function clickNavbar(flag: boolean): void {
    setFlagNavbar(flag)
    setGeneralStateMonth(false)
  }

  function clickOnMonth(count: number): void {
    setStateMonth(count)
    setGeneralStateMonth(true)
  }

  function clickDay(openFuncionality: string): void {
    if (openFuncionality !== '/month/events') return
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Context.Provider
          value={{
            authorized,
            flagNavbar,
            stateMonth,
            generalStateMonth,
            clickNavbar,
            clickOnMonth,
            clickDay
          }}
        >
          {!flagNavbar && (
            <React.Fragment>
              <Navbar />
            </React.Fragment>
          )}

          <Switch>
            <Route component={Calendar} path="/" exact />
            <Route component={SingUp} path="/sing-up" exact />
            <Route component={Login} path="/login" exact />
            <Route component={ClickMonth} path="/month" exact />
            <Route component={TaskList} path="/month/events" exact />
          </Switch>
        </Context.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App

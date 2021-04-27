import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import './App.css'
import Navbar from './components/Navbar'
import Calendar from './pages/Calendar'
import Login from './pages/Login'
import SingUp from './pages/Sing-up'
import ClickMonth from './pages/ClickMonth'
import TaskList from './pages/Task-list'
import { IMapStateToProps } from './interfaces'

const mapStateToProps = (state: IMapStateToProps) => {
  return { navbar: state.auth.navbar }
}

const connector = connect(mapStateToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

const App: React.FC<PropsFromRedux> = ({ navbar }) => {
  return (
    <div className="App">
      <BrowserRouter>
        {!navbar && (
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
      </BrowserRouter>
    </div>
  )
}

export default connect(mapStateToProps)(App)

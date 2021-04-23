import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Calendar from './pages/Calendar'
import Login from './pages/Login'
import SingUp from './pages/Sing-up'
import ClickMonth from './pages/ClickMonth'
import TaskList from './pages/Task-list'
import { connect } from 'react-redux'

const App: React.FC<any> = ({ navbar }) => {
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

const mapStateToProps = (state: any) => {
  return {
    navbar: state.auth.navbar
  }
}

export default connect(mapStateToProps, null)(App)

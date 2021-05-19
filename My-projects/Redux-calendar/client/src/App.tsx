import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import Navbar from './components/Navbar'
import { Footer } from './components/Footer'
import Calendar from './pages/Calendar'
import Login from './pages/Login'
import ClickMonth from './pages/ClickMonth'
import TaskList from './pages/Task-list'
import { IMapStateToProps } from './interfaces'
import './App.css'
import './styles/task-list.css'
import './styles/calendar.css'
import './styles/days.css'
import './styles/forms-auth-login.css'
import './styles/footer-header.css'
import { Kravich } from './pages/Kravich'
import SignUp from './pages/Sign-up'

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

        <section>
          <Switch>
            <Route component={Calendar} path="/" exact />
            <Route component={SignUp} path="/sign-up" exact />
            <Route component={Login} path="/login" exact />
            <Route component={ClickMonth} path="/month" exact />
            <Route component={TaskList} path="/month/events" exact />
            <Route component={Kravich} path="/about" exact />
          </Switch>
        </section>

        {!navbar && (
          <React.Fragment>
            <Footer />
          </React.Fragment>
        )}
      </BrowserRouter>
    </div>
  )
}

export default connect(mapStateToProps)(App)

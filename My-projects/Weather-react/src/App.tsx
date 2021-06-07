import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import { MyCards } from './pages/MyCards'
import { Navbar } from './components/Navbar'
import WindowSearch from './pages/Window-search'
import { getAllCities } from './redux/actions'
import { ImapDispatchToProps } from './interfaces'

const mapDispatchToProps: ImapDispatchToProps = { getAllCities }
const connector = connect(null, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

const App: React.FC<PropsFromRedux> = ({ getAllCities }) => {
  useEffect(() => getAllCities(), [getAllCities])

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Switch>
          <Route component={WindowSearch} path="/" exact />
          <Route component={MyCards} path="/cards" exact />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(App)

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import { MyCards } from './pages/MyCards'
import { Navbar } from './components/Navbar'
import WindowSearch from './pages/Window-search'
import { getAllCities, searchForMatches } from './redux/actions'

const mapDispatchToProps = { getAllCities, searchForMatches }

const App: React.FC<any> = ({ getAllCities }) => {
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

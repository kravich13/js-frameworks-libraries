import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/Navbar'
import WindowSearch from './pages/Window-search'
import { getAllCities, getSavedCities } from './redux/actions'
import { ImapDispatchToProps } from './interfaces'
import DetailedCity from './pages/Detailed-City'

const mapDispatchToProps: ImapDispatchToProps = {
  getAllCities,
  getSavedCities,
}
const connector = connect(null, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

const App: React.FC<PropsFromRedux> = ({ getAllCities, getSavedCities }) => {
  useEffect(() => {
    getAllCities()
    getSavedCities()
  }, [getAllCities, getSavedCities])

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Switch>
          <Route component={WindowSearch} path="/" exact />
          <Route component={DetailedCity} path="/detailinfo" exact />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(App)

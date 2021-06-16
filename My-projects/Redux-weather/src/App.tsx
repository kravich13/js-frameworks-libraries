import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { getAllCities, getSavedCities } from './redux/actions'
import { Navbar } from './components/Navbar'
import WindowSearch from './pages/Window-search'
import { Kravich } from './pages/Kravich'
import DetailedCity from './pages/Detailed-City'
import { Footer } from './components/Footer'
import { ImapDispatchToProps } from './interfaces'
import './App.css'

const mapDispatchToProps: ImapDispatchToProps = {
  getAllCities,
  getSavedCities,
}
const connector = connect(null, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

const App: React.FC<PropsFromRedux> = ({ getAllCities, getSavedCities }) => {
  useEffect((): void => {
    getAllCities()
    getSavedCities()
  }, [getAllCities, getSavedCities])

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <section>
          <Switch>
            <Route component={WindowSearch} path="/" exact />
            <Route component={Kravich} path="/about" exact />
            <Route component={DetailedCity} path="/detailinfo" exact />
          </Switch>
        </section>

        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(App)

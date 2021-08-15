import React, { useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { MaxKravich } from './components/MaxKravich'
import { VladKravich } from './components/VladKravich'
import { KatyaKravich } from './components/KatyaKravich'
import { Navbar } from './components/Navbar'
import './App.css'

const App: React.FC = () => {
  const dataHistory: History = window.history

  useEffect(() => {
    console.log(dataHistory)
  }, [dataHistory])
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Switch>
          <Route component={VladKravich} path="/" exact />
          <Route component={MaxKravich} path="/max" exact />
          <Route component={KatyaKravich} path="/katya" exact />
          <Route render={() => <div>There is no such page</div>} exact />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App

import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { MaxKravich } from './components/MaxKravich'
import { VladKravich } from './components/VladKravich'
import { KatyaKravich } from './components/KatyaKravich'
import { Navbar } from './components/Navbar'
import { Title } from './components/Title'
import './App.css'

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Title />
        <Navbar />

        <Switch>
          <Route component={VladKravich} path="/" exact />
          <Route component={MaxKravich} path="/max" exact />
          <Route component={KatyaKravich} path="/kate" exact />
          <Route render={() => <div>There is no such page</div>} exact />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App

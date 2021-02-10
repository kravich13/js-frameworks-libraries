import React from 'react'
import './App.css'
import Header from './all-blocks/Header'
import Rooms from './all-blocks/Rooms'
import WindowChat from './all-blocks/WindowChat'
import Context from './context'

function App() {
  function clickRoom(id) {
    console.log('нажал в другом компоненте')
  }

  return (
    <Context.Provider value={{ clickRoom: clickRoom }}>
      <div className="App">
        <Header />

        <section>
          <Rooms />
          <WindowChat />
        </section>
      </div>
    </Context.Provider>
  )
}

export default App

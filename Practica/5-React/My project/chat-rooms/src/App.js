import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import Header from './all-blocks/Header'
import Rooms from './all-blocks/Rooms'
import WindowChat from './all-blocks/WindowChat'
import Context from './context'

function App() {
  const [value, setValue] = useState('initial')
  const countRender = useRef(1)
  const inputRef = useRef(null)

  useEffect(() => {
    countRender.current++

    // Это сам DOM элемент, со всеми его доступными свойствами
    console.log(inputRef.current.value)
  })

  // При клике на кнопку будет фокус на элементе inputRef
  const focus = () => inputRef.current.focus()

  function clickRoom(id) {
    // console.log('нажал в другом компоненте')
  }

  return (
    <div className="App">
      <p>Значение: {countRender.current}</p>

      <input
        ref={inputRef}
        type="text"
        onChange={(event) => setValue(event.target.value)}
        value={value}
      />

      <button onClick={focus}>Фокус</button>

      <Header />

      <Context.Provider value={{ clickRoom: clickRoom }}>
        <section>
          <Rooms />
          <WindowChat />
        </section>
      </Context.Provider>
    </div>
  )
}

export default App

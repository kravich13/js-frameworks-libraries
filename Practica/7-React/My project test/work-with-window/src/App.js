import React, { useState } from 'react'
import './App.css'
import FormInput from './components/form-input'
import TodoList from './components/list-todo'
import Context from './context'

function App() {
  const [elemLi, setElemLi] = useState([
    { id: 1, title: 'Владислав', hover: false },
    { id: 2, title: 'Максим', hover: false },
    { id: 3, title: 'Кравич', hover: false },
    { id: 4, title: 'Максим', hover: false },
    { id: 5, title: 'Максим', hover: false },
    { id: 6, title: 'Максим', hover: false },
    { id: 7, title: 'Максим', hover: false }
  ])

  const [flag, setFlag] = useState(false)

  function clickExit(id) {
    setElemLi(elemLi.filter((elem) => elem.id !== id))
    setFlag(true)
  }

  function hoverElem(id) {
    if (flag) return setFlag(false)
    setElemLi(
      elemLi.map((elem) => {
        if (elem.id === id) elem.hover = !elem.hover
        return elem
      })
    )
  }

  function addLi(title) {
    setElemLi(
      elemLi.concat([
        {
          id: Date.now(),
          title: title,
          hover: false
        }
      ])
    )
  }

  return (
    <div className="App">
      <h2>Тестовое приложение с основной работой DOM.</h2>
      <FormInput addLi={addLi} />

      <ul className={'block-Li'}>
        {!elemLi.length && (
          <li style={{ listStyle: 'none' }}>Нет таких элементов</li>
        )}
        <Context.Provider value={{ clickExit, hoverElem }}>
          {elemLi.map((elem, index) => {
            return <TodoList {...elem} index={index} key={elem.id} />
          })}
        </Context.Provider>
      </ul>
    </div>
  )
}

export default App

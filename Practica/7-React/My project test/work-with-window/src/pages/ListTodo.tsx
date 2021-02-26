import React, { useState } from 'react'
import FormInput from '../components/form-input'
import TodoList from '../components/list-todo'
import Context from '../context'

interface stateLi {
  id: number
  title: string
  hover: boolean
}

export const ListTodo: React.FC = () => {
  const [elemLi, setElemLi] = useState<stateLi[]>([
    { id: 1, title: 'Владислав', hover: false },
    { id: 2, title: 'Максим', hover: false },
    { id: 3, title: 'Кравич', hover: false },
    { id: 4, title: 'Максим', hover: false },
    { id: 5, title: 'Максим', hover: false },
    { id: 6, title: 'Максим', hover: false },
    { id: 7, title: 'Максим', hover: false }
  ])

  function clickExit(id: string | number) {
    setElemLi(elemLi.filter((elem: any) => elem.id !== id))
  }

  function hoverElem(id: string | number) {
    setElemLi((prev) =>
      prev.map((elem: any) => {
        if (elem.id === id) {
          return {
            ...elem,
            hover: !elem.hover
          }
        }
        return elem
      })
    )
  }

  function addLi(title: string) {
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
    <div>
      <FormInput addLi={addLi} />

      <ul className={'block-Li'}>
        {!elemLi.length && (
          <li style={{ listStyle: 'none' }}>Нет таких элементов</li>
        )}
        <Context.Provider value={{ clickExit, hoverElem }}>
          {elemLi.map((elem: any, index: number) => {
            return <TodoList {...elem} index={index} key={elem.id} />
          })}
        </Context.Provider>
      </ul>
    </div>
  )
}

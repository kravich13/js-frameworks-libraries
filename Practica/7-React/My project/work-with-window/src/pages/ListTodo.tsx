import { POINT_CONVERSION_COMPRESSED } from 'constants'
import React, { useState } from 'react'
import FormInput from '../components/Form-input'
import TodoList from '../components/Li-element'
import Context from '../context'

interface stateLi {
  id: number
  title: string
  click: boolean
  hover: boolean
}

export const ListTodo: React.FC = () => {
  const [elemLi, setElemLi] = useState<stateLi[]>([
    { id: 1, title: 'Владислав', click: false, hover: false },
    { id: 2, title: 'Максим', click: false, hover: false },
    { id: 3, title: 'Кравич', click: false, hover: false },
    { id: 4, title: 'Максим', click: false, hover: false },
    { id: 5, title: 'Максим', click: false, hover: false },
    { id: 6, title: 'Максим', click: false, hover: false },
    { id: 7, title: 'Максим', click: false, hover: false }
  ])

  function clickExit(id: number) {
    setElemLi((prev) =>
      prev.filter((elem: any) => {
        if (elem.id !== id) return elem
      })
    )
  }

  const clickElem = (
    event: React.MouseEvent<HTMLLIElement>,
    id: number,
    ref: any
  ): void => {
    if (event.target !== ref) return

    setElemLi((prev) =>
      prev.map((elem: any) => {
        if (elem.id !== id && elem.click) {
          // не равен нажатому элементу и имеет покраску
          return {
            ...elem,
            click: false
          }
        }
        if (elem.id === id) {
          if (!elem.click) {
            return {
              ...elem,
              click: !elem.click,
              hover: !elem.hover
            }
          }
        }
        return elem
      })
    )
  }

  function overElem(id: number): void {
    setElemLi((prev) =>
      prev.map((elem: any) => {
        if (elem.id === id) {
          if (!elem.click) {
            return {
              ...elem,
              hover: !elem.hover
            }
          }
        }
        return elem
      })
    )
  }

  function outElem(id: number): void {
    setElemLi((prev) =>
      prev.map((elem: any) => {
        if (elem.id === id) {
          return {
            ...elem,
            hover: false
          }
        }
        return elem
      })
    )
  }

  function addLi(title: string): void {
    setElemLi(
      elemLi.concat([
        {
          id: Date.now(),
          title: title,
          click: false,
          hover: false
        }
      ])
    )
  }

  return (
    <div>
      <FormInput addLi={addLi} />

      <ul className={'block-Li'}>
        {!elemLi.length && <li style={{ listStyle: 'none' }}>Список пуст!</li>}
        <Context.Provider value={{ clickExit, clickElem, overElem, outElem }}>
          {elemLi.map((elem: any, index: number) => {
            return <TodoList {...elem} index={index} key={elem.id} />
          })}
        </Context.Provider>
      </ul>
    </div>
  )
}

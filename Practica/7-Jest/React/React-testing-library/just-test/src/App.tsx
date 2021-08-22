import React, { useEffect, useState } from 'react'
import './App.css'
import { List } from './components/List'

const getUser = (): Promise<string> => Promise.resolve('Max')

const App: React.FC = () => {
  const [pState, setPState] = useState<boolean>(false)
  const [user, setUser] = useState<string>('')

  useEffect((): void => {
    const loadUser = async (): Promise<void> => {
      try {
        const userData = await getUser()
        setUser(userData)
      } catch (err) {
        return
      }
    }
    loadUser()
  }, [setUser])

  return (
    <div className="App">
      <div className="sync-test">
        <h3>Hello</h3>
        <p>Какая-то инфа</p>
        <p>{pState ? 'Max' : 'Vlad'} Kravich</p>
        <img alt="нет картинки"></img>
        <label htmlFor="search" />
        <input type="text" placeholder="Текст..." defaultValue="13" />
        <button
          data-testid="buttonApp-click"
          onClick={(): void => setPState(true)}
        >
          Нажми
        </button>
      </div>

      <div className="async-test">{user && <h2>Logged in as {user}</h2>}</div>

      <div className="approval">
        <p className="classTest">Привет</p>
        <p id="kravich1">Ку</p>
      </div>

      <List />
    </div>
  )
}

export default App

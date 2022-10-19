import React from 'react'
import './App.css'
import { List } from './components/List'

const list: string[] = ['Vlad', 'Max', 'Kravich']

export const App: React.FC = () => {
  return (
    <div className="App">
      <List list={list} />
    </div>
  )
}

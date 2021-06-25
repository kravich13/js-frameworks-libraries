import React, { memo, useMemo, useState } from 'react'
import './App.css'
import List1 from './components/List1'
import { List2 } from './components/List2'
import { Search } from './components/Search'

const MemoList2 = memo(List2)

export const App: React.FC = () => {
  const [value, setValue] = useState<string>('')
  const list2 = useMemo((): number[] => [1, 2, 3, 4, 5], [])

  return (
    <div className="App">
      <p>{value}</p>
      <Search setValue={setValue} />
      <List1 inputValue={value} />
      <MemoList2 list={list2} />
    </div>
  )
}

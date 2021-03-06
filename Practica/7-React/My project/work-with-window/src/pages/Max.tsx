import React from 'react'
import { useHistory } from 'react-router-dom'

export const Max: React.FC = () => {
  const history = useHistory()
  return (
    <div>
      <h2>Приветствую тебя на странице Макса!</h2>
      <button onClick={() => history.push('/')}>Вернуться на главную</button>
    </div>
  )
}

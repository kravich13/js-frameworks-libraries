import React from 'react'
import { useHistory } from 'react-router-dom'

export const Kravich: React.FC = () => {
  const history = useHistory()
  return (
    <div>
      <h2>Приветствую тебя на странице Кравича!</h2>
      <button onClick={() => history.push('/')}>Вернуться на главную</button>
    </div>
  )
}

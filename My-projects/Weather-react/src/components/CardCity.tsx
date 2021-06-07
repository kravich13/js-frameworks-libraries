import React from 'react'
import { ICardCity_Props } from '../interfaces'

export const CardCity: React.FC<ICardCity_Props> = ({ stateCity }) => {
  const { title, added } = stateCity

  return (
    <li>
      {title}
      <button>{!added ? 'Добавить' : 'Удалить'}</button>
    </li>
  )
}

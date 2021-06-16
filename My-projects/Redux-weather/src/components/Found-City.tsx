import React from 'react'
import { useDispatch } from 'react-redux'
import { enteredCity } from '../redux/actions'
import { IFounedCity_Props } from '../interfaces'

export const FoundCity: React.FC<IFounedCity_Props> = ({ stateCity }) => {
  const dispatch: Function = useDispatch()
  const { id, title, selected } = stateCity
  const classes: string[] = ['city-lighting']

  if (selected) classes.push('selected-city')

  const clickLi: Function = (id: number | null, title: string): void => {
    dispatch(enteredCity({ id, title }))
  }

  return (
    <li
      className={classes.join(' ')}
      onMouseDown={(): void => clickLi(id, title)}
    >
      {title}
    </li>
  )
}

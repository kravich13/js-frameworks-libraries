import React from 'react'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { clicked_item } from '../redux/actions'

export const FoundCity: React.FC<any> = ({ elemCity }) => {
  const dispatch: Dispatch = useDispatch()
  const { id, title, selected } = elemCity
  const classes = ['city-lighting']
  if (selected) classes.push('selected-city')

  const clickLi = (id: number) => {
    dispatch(clicked_item(id))
  }

  return (
    <li className={classes.join(' ')} onClick={() => clickLi(id)}>
      {title}
    </li>
  )
}

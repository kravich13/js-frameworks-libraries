import React, { useRef } from 'react'
import { IListRoomsProps } from '../interfaces'

export const ListRooms: React.FC<IListRoomsProps> = (props) => {
  const { id, title, clickLi, clickDelete, overLi, outLi } = props
  const mainElem = useRef<HTMLLIElement>(null)
  const classes: string[] = ['roomsLi']

  if (props.click) classes.push('clickRoomLi')
  if (props.hover) classes.push('hoverRoom')

  return (
    <li
      ref={mainElem}
      className={classes.join(' ')}
      onClick={(event) => clickLi(event, id, mainElem.current, title)}
      onMouseOver={() => overLi(id)}
      onMouseOut={() => outLi(id)}
    >
      <span className="room-li">{title}</span>
      <button className="delete-room" onClick={() => clickDelete(title)}>
        &#10008;
      </button>
    </li>
  )
}

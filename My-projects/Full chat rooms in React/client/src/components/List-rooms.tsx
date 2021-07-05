import React, { useRef } from 'react'
import { IListRoomsProps } from '../interfaces'
import '../styles/list-rooms.css'

export const ListRooms: React.FC<IListRoomsProps> = ({
  id,
  title,
  clickLi,
  clickDelete,
  overLi,
  outLi,
  click,
  hover,
}) => {
  const $mainElem = useRef<HTMLLIElement>(null)
  const classes: string[] = ['roomsLi']
  const titleRoom: string =
    title.length > 14 ? `${title.slice(0, 14)}...` : title

  if (click) classes.push('clickRoomLi')
  if (hover) classes.push('hoverRoom')

  return (
    <li
      ref={$mainElem}
      className={classes.join(' ')}
      onClick={(event) => clickLi(event, id, $mainElem.current, title)}
      onMouseOver={() => overLi(id, true)}
      onMouseOut={() => outLi(id, false)}
      title={title}
    >
      <span className="room-li">{titleRoom}</span>
      <button
        className="delete-room"
        onClick={() => clickDelete(title)}
        title="Delete"
      >
        &#10008;
      </button>
    </li>
  )
}

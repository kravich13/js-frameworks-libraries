import React, { useEffect, useRef, useState } from 'react'
import { IListRoomsProps } from '../interfaces'

export const ListRooms: React.FC<IListRoomsProps> = (props) => {
  const { id, title, clickLi, clickDelete, overLi, outLi } = props
  const [titleRoom, setTitleRoom] = useState<string>(title)
  const $mainElem = useRef<HTMLLIElement>(null)
  const classes: string[] = ['roomsLi']

  if (props.click) classes.push('clickRoomLi')
  if (props.hover) classes.push('hoverRoom')

  useEffect((): void => {
    if (title.length > 14) {
      const desiredLength: string = title.slice(0, 14)
      setTitleRoom(`${desiredLength}...`)
      return
    }
  }, [title])

  return (
    <li
      ref={$mainElem}
      className={classes.join(' ')}
      onClick={(event) => clickLi(event, id, $mainElem.current, title)}
      onMouseOver={() => overLi(id)}
      onMouseOut={() => outLi(id)}
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

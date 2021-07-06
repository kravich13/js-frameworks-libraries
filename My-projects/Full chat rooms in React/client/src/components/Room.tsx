import React, { useEffect, useRef, useState } from 'react'
import { IRoom_Props } from '../interfaces'
import '../styles/list-rooms.css'

export const Room: React.FC<IRoom_Props> = ({
  id,
  title,
  clickLi,
  clickDelete,
  click,
}) => {
  const $mainElem = useRef<HTMLLIElement>(null)
  // const [classes, setClasses] = useState<string[]>(['roomsLi'])
  const classes: string[] = ['roomsLi']
  const titleRoom: string =
    title.length > 14 ? `${title.slice(0, 14)}...` : title

  if (click) classes.push('clickRoomLi')

  // if (click) classes.push('clickRoomLi')
  // useEffect(() => {
  //   if (click) {
  //     const obj: any = {}

  //     setClasses((prev) => {
  //       prev.forEach((elem) => {
  //         if (!obj[elem]) obj[elem] = 1
  //         else obj[elem] += 1
  //       })

  //       for (const key of obj) {
  //         if (obj[key] === 1)
  //       }
  //       return [...prev, 'clickRoomLi']
  //     })
  //     console.log(obj)
  //   }
  // }, [click])

  const onMouseOver = (): void => {
    if (click) return

    // console.log('тут')
    // classes.push('roomHover')
  }

  return (
    <li
      ref={$mainElem}
      className={classes.join(' ')}
      onClick={(event) => clickLi(event, id, $mainElem.current, title)}
      title={title}
      onMouseOver={(): void => onMouseOver()}
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

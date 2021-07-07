import React, { useRef } from 'react'
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

  const classes: string[] = ['roomsLi']
  const titleRoom: string =
    title.length > 14 ? `${title.slice(0, 14)}...` : title
  // const [classes, setClasses] = useState<string[]>(fnTest)

  if (click) classes.push('clickRoomLi')

  // const onMouseOver = (): void => {
  //   if (click) return

  //   setClasses((prev) => [...prev, 'roomHover'])
  // }

  // const onMouseOut = (): void => {
  //   setClasses((prev) => prev.filter((elem) => elem !== 'roomHover'))
  // }

  return (
    <li
      ref={$mainElem}
      className={classes.join(' ')}
      onClick={(event) => clickLi(event, id, $mainElem.current, title)}
      title={title}
      // onMouseOver={(): void => onMouseOver()}
      // onMouseOut={(): void => onMouseOut()}
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

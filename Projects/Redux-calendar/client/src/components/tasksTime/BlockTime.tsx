import React from 'react'
import { IBlockTime_Props } from '../../interfaces'

export const BlockTime: React.FC<IBlockTime_Props> = ({
  classes,
  $blocksTime,
  title,
  index,
  lastElem,
}) => {
  if (lastElem === index) classes.push('end-time-toDo')

  return (
    <li
      className={classes.join(' ')}
      ref={(el: HTMLLIElement) => ($blocksTime.current[index] = el)}
    >
      <h3 id={`task${index}`} className="time-toDo">
        {title}
      </h3>
      <div className="container-toDo"></div>
    </li>
  )
}

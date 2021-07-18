import React from 'react'
import { IBlocksTime_Props } from '../../interfaces'
import { BlockTime } from './BlockTime'

export const BlocksTime: React.FC<IBlocksTime_Props> = ({
  hours,
  $blocksTime,
}) => {
  const classes: string[] = ['block-time-toDo']

  return (
    <ul id="task-list">
      {hours.map((title, index: number): JSX.Element => {
        return (
          <BlockTime
            classes={classes}
            $blocksTime={$blocksTime}
            title={title}
            index={index}
            key={index}
            lastElem={hours.length - 1}
          />
        )
      })}
    </ul>
  )
}

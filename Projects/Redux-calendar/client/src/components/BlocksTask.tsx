import React from 'react'
import { BlockTask } from './BlockTask'
import { IBlocksTasks_Props } from '../interfaces'

export const BlocksTask: React.FC<IBlocksTasks_Props> = ({
  blocks,
  fn_delTask,
}) => {
  return (
    <React.Fragment>
      {blocks.map((elem): JSX.Element => {
        return <BlockTask block={elem} key={elem.id} fn_delTask={fn_delTask} />
      })}
    </React.Fragment>
  )
}

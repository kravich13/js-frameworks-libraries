import React from 'react'
import { BlockTask } from '../components/BlockTask'
import { IBlocksTasks_Props } from '../interfaces'

export const BlocksTask: React.FC<IBlocksTasks_Props> = ({
  blocks,
  fn_delTask
}) => {
  return (
    <React.Fragment>
      {blocks.map((elem: any) => {
        return <BlockTask block={elem} key={elem.id} fn_delTask={fn_delTask} />
      })}
    </React.Fragment>
  )
}

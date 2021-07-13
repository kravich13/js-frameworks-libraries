import React from 'react'
import { IBlockTask_Props } from '../interfaces'

export const BlockTask: React.FC<IBlockTask_Props> = ({
  block,
  fn_delTask,
}) => {
  const { posTop, posLeft, height, position, title } = block
  const classes: string[] = ['blockTask']
  const styles: Object = {
    top: `${posTop}px`,
    left: `${posLeft}px`,
    height: `${height}px`,
  }

  let finalTitle: string = title

  if (position === 'center' && title.length > 20) {
    finalTitle = `${title.slice(0, 17)}...`
  } else if (position !== 'center' && title.length > 5) {
    finalTitle = `${title.slice(0, 5)}...`
  }

  if (position !== 'center') classes.push('half-blockTask')

  return (
    <div className={classes.join(' ')} style={styles}>
      <p className="leftTaskBorder"></p>
      <p className="blocksTasksTitle" title={title}>
        {finalTitle}
      </p>
      <div
        className="deleteTask"
        onClick={(): Function => fn_delTask(block)}
        title="Delete"
      >
        &#215;
      </div>
    </div>
  )
}

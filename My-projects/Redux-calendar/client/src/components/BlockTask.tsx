import React, { useEffect, useState } from 'react'
import { IBlockTask_Props } from '../interfaces'

export const BlockTask: React.FC<IBlockTask_Props> = ({
  block,
  fn_delTask,
}) => {
  const [title, setTitle] = useState<string>('')

  const classes: string[] = ['blockTask']
  const top: string = `${block.posTop}px`
  const left: string = `${block.posLeft}px`
  const height: string = `${block.height}px`

  useEffect((): void => {
    let lengthStr: number = 20

    if (block.position === 'center') {
      if (block.title.length < 20) return setTitle(block.title)
    } else {
      if (block.title.length < 5) return setTitle(block.title)
      lengthStr = 5
    }

    const desiredLength: string = block.title.slice(0, lengthStr)
    setTitle(`${desiredLength}...`)
  }, [block.title, block.position])

  if (block.position !== 'center') classes.push('half-blockTask')

  return (
    <div className={classes.join(' ')} style={{ top, left, height }}>
      <p className="leftTaskBorder"></p>
      <p className="blocksTasksTitle" title={block.title}>
        {title}
      </p>
      <div
        className="deleteTask"
        onClick={() => fn_delTask(block)}
        title="Delete"
      >
        &#215;
      </div>
    </div>
  )
}

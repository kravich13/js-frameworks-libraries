import React, { useEffect, useRef, useState } from 'react'
import { IBlockTaskProps, IBlockTask_styles } from '../interfaces'

export const BlockTask: React.FC<IBlockTaskProps> = ({
  elem,
  blocksTasks,
  count,
  addTitle
}) => {
  const styles = useRef<IBlockTask_styles>({
    position: 'absolute',
    background: '#e2ecf5',
    borderLeft: '3px solid #6e9ecf',
    width: '200px',
    top: `${elem.posTop}px`,
    left: `${elem.posLeft}px`,
    height: `${elem.posHeight}px`
  })

  const [title, setTitle] = useState<string>('')

  useEffect(() => {
    if (addTitle.length > 25) {
      const desiredLength: string = addTitle.slice(0, 24)

      setTitle(`${desiredLength} ...`)
    }
  }, [addTitle])

  return (
    <div
      ref={(el: any) => (blocksTasks.current[count] = el)}
      style={styles.current}
    >
      <p className="blocksTasksTitle">{title}</p>
    </div>
  )
}

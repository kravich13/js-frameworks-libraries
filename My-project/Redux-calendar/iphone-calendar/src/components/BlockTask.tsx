import React, { useEffect, useRef, useState } from 'react'
import { IBlockTaskProps, IBlockTask_styles } from '../interfaces'

export const BlockTask: React.FC<IBlockTaskProps> = ({ elem }) => {
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

  useEffect((): void => {
    if (elem.title.length < 20) return setTitle(elem.title)

    const desiredLength: string = elem.title.slice(0, 20)
    setTitle(`${desiredLength} ...`)
  }, [elem.title])

  return (
    <div style={styles.current}>
      <p className="blocksTasksTitle">{title}</p>
    </div>
  )
}

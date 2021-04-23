import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { deleteTask } from '../redux/actions'
// import { IBlockTaskProps, IBlockTask_styles } from '../interfaces'

const BlockTask: React.FC<any> = ({ elem, deleteTask }) => {
  const [title, setTitle] = useState<string>('')

  const classes: string[] = ['blockTask']
  const top: string = `${elem.posTop}px`
  const left: string = `${elem.posLeft}px`
  const height: string = `${elem.height}px`

  useEffect((): void => {
    let lengthStr: number = 20

    if (elem.position === 'center') {
      if (elem.title.length < 20) return setTitle(elem.title)
    } else {
      if (elem.title.length < 8) return setTitle(elem.title)
      else lengthStr = 8
    }

    const desiredLength: string = elem.title.slice(0, lengthStr)
    setTitle(`${desiredLength}...`)
  }, [elem.title, elem.position])

  if (elem.position !== 'center') classes.push('half-blockTask')

  function clickTest() {
    deleteTask({ id: elem.id })
  }
  return (
    <div className={classes.join(' ')} style={{ top, left, height }}>
      <p className="leftTaskBorder"></p>
      <p className="blocksTasksTitle">{title}</p>
      <div className="deleteTask" onClick={clickTest}>
        &#215;
      </div>
    </div>
  )
}

const mapDispatchToProps = { deleteTask }

export default connect(null, mapDispatchToProps)(BlockTask)

import React, { useContext, useRef } from 'react'
import Context from '../context'

const TodoList: React.FC = (props: any) => {
  const { clickExit, clickElem, overElem, outElem } = useContext<any>(Context)
  const classes: string[] = ['elem-li']
  const mainElem = useRef<HTMLLIElement>(null)
  if (props.click) classes.push('li-click ')
  if (props.hover) classes.push('li-hover')

  return (
    <li
      ref={mainElem}
      className={classes.join(' ')}
      onClick={(event) => clickElem(event, props.id, mainElem.current)}
      onMouseOver={() => overElem(props.id)}
      onMouseOut={() => outElem(props.id)}
    >
      <span className="titleLi">
        [{props.index + 1}] {props.title}
      </span>
      <button className="span-X" onClick={() => clickExit(props.id)}>
        &#10008;
      </button>
    </li>
  )
}

export default TodoList

import React, { useContext } from 'react'
import Context from '../context'

const TodoList: React.FC = (props: any) => {
  const { clickExit, hoverElem } = useContext<any>(Context)
  const classes: string[] = ['elem-li']
  if (props.hover) classes.push('li-click ')

  return (
    <li className={classes.join(' ')} onClick={() => hoverElem(props.id)}>
      [{props.index + 1}] {props.title}
      <button className="span-X" onClick={() => clickExit(props.id)}>
        &#10008;
      </button>
    </li>
  )
}

export default TodoList

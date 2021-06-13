import React from 'react'

export const List: React.FC<any> = ({ list }) => {
  if (list.length < 0) return <div>No items in list</div>
  return (
    <ol>
      {list.map((title: string, index: number) => {
        return <li key={index}>{title}</li>
      })}
    </ol>
  )
}

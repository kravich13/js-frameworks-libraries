import React from 'react'

export const List2: React.FC<any> = ({ list }) => {
  console.log('тут2')
  return (
    <ul>
      {list.map((value: number, index: number) => {
        return <li key={index}>{value}</li>
      })}
    </ul>
  )
}

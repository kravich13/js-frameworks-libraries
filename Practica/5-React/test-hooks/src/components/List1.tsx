import React from 'react'

const List1: React.FC<any> = () => {
  return (
    <ul>
      <li>тут</li>
    </ul>
  )
}

export default React.memo(List1, (prevProps, nextProps): boolean => {
  return nextProps.inputValue === 'kravich' ? false : true
})

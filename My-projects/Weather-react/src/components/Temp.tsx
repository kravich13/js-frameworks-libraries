import React, { useRef } from 'react'

export const Temp: React.FC<any> = ({ title, index }) => {
  const $elem = useRef<HTMLLIElement>(null)

  const whereToOmit = `${100 - title}px`
  let whereToMove = ''
  // if ($elem.current) {
  whereToMove = `${index * 66}px`
  // }

  return (
    <li
      ref={$elem}
      style={{
        position: 'absolute',
        padding: '3px',
        background: `rgb(2${title + title * 1.3}, 250, 156)`,
        top: whereToOmit,
        left: whereToMove,
        width: '60px',
        borderBottom: '1px  solid rgb(150, 200, 156)',
      }}
    >
      {title}
    </li>
  )
}

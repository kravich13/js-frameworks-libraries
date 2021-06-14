import React from 'react'

export const Temp: React.FC<any> = ({ title, index }) => {
  return (
    <div
      style={{
        position: 'absolute',
        padding: '3px',
        background: `rgb(2${title + title * 1.3}, 250, 156)`,
        top: `${100 - title}px`,
        left: `${index * 66}px`,
        width: '60px',
        borderBottom: '1px  solid rgb(150, 200, 156)',
        textAlign: 'center',
      }}
    >
      {title}
    </div>
  )
}

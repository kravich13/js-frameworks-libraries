import React, { useEffect, useState } from 'react'

const LazyComponent: React.FC = () => {
  const [title, setTitle] = useState<string>('')

  useEffect((): void => {
    new Promise((resolve) => {
      setTimeout(() => {
        setTitle('Показать через 3 секунды')
        resolve(true)
      }, 3000)
    })
  }, [])

  return <div>{title}</div>
}

export default LazyComponent

import React, { useCallback, useEffect, useState } from 'react'

const FunCallback: React.FC = () => {
  const [message] = useState<string>('Ку')
  const [counter, setCounter] = useState<number>(0)

  const greeting = useCallback((text: string) => {
    console.log(text)
  }, [])

  useEffect(() => greeting(message), [greeting, message])

  return (
    <button onClick={() => setCounter((prev: number) => (prev = counter + 1))}>
      Нажали {counter} раз
    </button>
  )
}

export default React.memo(FunCallback)

import React, { useState, useEffect } from 'react'
import { IChatInfoProps } from '../interfaces'
import '../styles/chat-info.css'

export const ChatInfo: React.FC<IChatInfoProps> = ({ socket, clickRoom }) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [numberOfusers, setNumberOfUsers] = useState<string>(
    localStorage.getItem('numberOfUsers') ?? '0'
  )

  const enterRoom = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): string | void => {
    if (event.code === 'Enter') {
      const et = event.target as HTMLInputElement

      if (et.value === '') return (et.placeholder = 'Пустая строка')
      if (et.value.length < 3 || et.value.length > 32) {
        return defaultInput(et, 'От 3-х до 32-х символов')
      }

      const roomMatch = et.value.match(/\w+/gi) as RegExpMatchArray
      if (roomMatch?.length) {
        if (roomMatch[0] !== et.value) {
          return defaultInput(et, 'Англ. и "_"')
        }
      } else return defaultInput(et, 'Англ. и "_"')

      socket.emit('addRoom', et.value)
      defaultInput(et, 'Введите название комнаты')
    }
    function defaultInput(elem: HTMLInputElement, text: string): void {
      setInputValue('')
      elem.placeholder = text
    }
  }

  useEffect((): (() => void) => {
    let cleanupFunction: boolean = false

    socket.on('numberOfUsers', async (count: number) => {
      if (cleanupFunction) return
      localStorage.setItem('numberOfUsers', `${count}`)
      setNumberOfUsers(`${count}`)
    })

    return (): void => {
      cleanupFunction = true
    }
  }, [socket])

  return (
    <div id="chat-info">
      <div id="container-addRoom">
        <input
          onKeyDown={(event) => enterRoom(event)}
          type="text"
          placeholder="Введите название комнаты"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
      </div>
      <h3>
        {clickRoom} | Online: {numberOfusers}
      </h3>
    </div>
  )
}

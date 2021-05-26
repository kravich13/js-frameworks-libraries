import React, { useState, useEffect } from 'react'
import { IChatInfoProps } from '../interfaces'
import '../styles/chat-info.css'

export const ChatInfo: React.FC<IChatInfoProps> = ({ socket, clickRoom }) => {
  const [numberOfusers, setNumberOfUsers] = useState<string>((): string => {
    return localStorage.getItem('numberOfUsers') ?? ''
  })

  const enterRoom = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): string | void => {
    if (event.code === 'Enter') {
      const et: HTMLInputElement = event.target as HTMLInputElement

      if (et.value === '') return (et.placeholder = 'Пустая строка')
      if (et.value.length < 3 || et.value.length > 32) {
        return setPlaceholder(et, 'От 3-х до 32-х символов')
      }

      const roomMatch: RegExpMatchArray | null = et.value.match(/\w+/gi)
      if (roomMatch !== null) {
        if (roomMatch[0] !== et.value) {
          return setPlaceholder(et, 'Англ. и "_"')
        }
      } else return setPlaceholder(et, 'Англ. и "_"')

      socket.emit('addRoom', et.value)
      setPlaceholder(et, 'Введите название комнаты')
    }
    function setPlaceholder(elem: HTMLInputElement, text: string): void {
      elem.value = ''
      elem.placeholder = text
    }
  }

  useEffect((): void => {
    socket.on('numberOfUsers', async (count: number) => {
      try {
        localStorage.setItem('numberOfUsers', `${count}`)
        setNumberOfUsers(`${count}`)
      } catch (err) {
        alert('Произошла ошибка')
      }
    })
  }, [socket])

  return (
    <div id="chat-info">
      <div id="container-addRoom">
        <input
          onKeyDown={(event) => enterRoom(event)}
          type="text"
          placeholder="Введите название комнаты"
        />
      </div>
      <h3>
        {clickRoom} | Online: {numberOfusers}
      </h3>
    </div>
  )
}

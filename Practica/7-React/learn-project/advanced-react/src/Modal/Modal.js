import React, { useEffect, useState } from 'react'
import './Modal.css'

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false)

  function clickModal(flag) {
    // Клики вне самой кнопки не срабатывают
    console.log(`Нажал на: ${flag}`)
    setIsOpen(!isOpen)
  }

  return (
    <React.Fragment>
      <button onClick={() => clickModal(true)}>Открыть окно</button>

      {isOpen && (
        <div className="modal">
          <div className="modal-body">
            <h1>Окно Кравича</h1>
            <p>Получено вознаграждение!</p>
            <button onClick={() => clickModal(false)}>Закрыть окно</button>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

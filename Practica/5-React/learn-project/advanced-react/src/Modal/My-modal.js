import React from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'

export default function PortalModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-body">
        <h2>Сообщение:</h2>
        <p>Скорейшего зарабатывания 13 миллионов долларов!</p>
        <button onClick={onClose}>Закрыть портал</button>
      </div>
    </div>,
    document.body
  )
}

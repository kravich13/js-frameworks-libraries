import React from 'react'

export default function FormInput({ addLi }) {
  function changeForm(event) {
    event.preventDefault()

    const $input = event.target[0]

    if (!$input.value) return

    addLi($input.value)
    $input.value = ''
  }

  return (
    <form name="formData" onSubmit={(event) => changeForm(event)}>
      <input name="inputWindow" placeholder="Введите название" />
      <button name="buttonSend">Добавить элемент</button>
    </form>
  )
}

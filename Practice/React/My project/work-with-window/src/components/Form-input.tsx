import React, { useRef } from 'react'

type FormInputProps = {
  addLi: any
}

const FormInput: React.FC<FormInputProps> = ({ addLi }) => {
  const $input = useRef<HTMLInputElement>(null)

  const changeForm = (event: React.ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault()

    if (!$input.current!.value) return

    addLi($input.current!.value)
    $input.current!.value = ''
  }

  return (
    <form name="formData" onSubmit={(event: any) => changeForm(event)}>
      <input ref={$input} placeholder="Введите название" />
      <button>Добавить элемент</button>
    </form>
  )
}

export default FormInput

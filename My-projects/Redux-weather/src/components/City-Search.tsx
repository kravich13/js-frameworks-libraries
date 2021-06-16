import React, { useEffect, useRef, useState } from 'react'
import { makeStyles, TextField, Typography } from '@material-ui/core'
import { ClassNameMap } from '@material-ui/styles'
import { ICitySearch_Props } from '../interfaces'

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  subTitle: { textAlign: 'center' },
})

export const CitySearch: React.FC<ICitySearch_Props> = ({
  clickedItem,
  item_selection_arrow,
  searchForMatches,
  enteredCity,
  clearSearch,
}) => {
  const classes: ClassNameMap<string> = useStyles()
  const $textField = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState<string>('')
  const { id, title } = clickedItem

  const submitForm: React.FormEventHandler = (
    event: React.ChangeEvent<HTMLFormElement>
  ): void => {
    event.preventDefault()

    if (inputValue.length < 2) return
    enteredCity({ id, title })
  }

  useEffect((): void => {
    if (clickedItem.default) return // the first elem from search

    $textField.current!.value = clickedItem.title
    // $textField.current!.focus()
    // $textField.current!.select()
  }, [clickedItem])

  const keyDownInput = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    const code: string = event.code

    if (code === 'ArrowUp' || code === 'ArrowDown') {
      event.preventDefault()
      item_selection_arrow(code)
    }
  }

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue((prev) => (prev = event.target.value))
    searchForMatches(event.target.value)
  }

  return (
    <form onSubmit={submitForm}>
      <label>
        <Typography variant="subtitle1" className={classes.subTitle}>
          Enter the nаme of the city
        </Typography>
        <TextField
          label="Search"
          color="secondary"
          onChange={onChangeInput}
          onKeyDown={keyDownInput}
          onFocus={(event): void => event.target.select()}
          onBlur={(): void => clearSearch()}
          inputRef={$textField}
        />
      </label>
    </form>
  )
}

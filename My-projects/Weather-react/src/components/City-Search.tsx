import { makeStyles, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useRef } from 'react'
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
  const classes = useStyles()
  const $textField = useRef<HTMLInputElement>(null)
  const { id, title } = clickedItem

  const submitForm: React.FormEventHandler = (
    event: React.ChangeEvent<HTMLFormElement>
  ): void => {
    event.preventDefault()

    if ($textField.current!.value.length < 2) return
    enteredCity({ id, title })
  }

  const keyDown: React.KeyboardEventHandler = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    const code: string = event.code

    if (code === 'ArrowUp' || code === 'ArrowDown') {
      event.preventDefault()
      item_selection_arrow(code)
    }
  }

  useEffect((): void => {
    if (clickedItem.default) return // the first elem from search

    $textField.current!.value = clickedItem.title
    // $textField.current!.focus()
    // $textField.current!.select()
  }, [clickedItem])

  return (
    <form onSubmit={submitForm}>
      <label>
        <Typography variant="subtitle1" className={classes.subTitle}>
          Enter the nаme of the city
        </Typography>
        <TextField
          label="Search"
          color="secondary"
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
            searchForMatches(event.target.value)
          }
          onKeyDown={keyDown}
          onFocus={(event): void => event.target.select()}
          onBlur={(): void => clearSearch()}
          inputRef={$textField}
        />
      </label>
    </form>
  )
}

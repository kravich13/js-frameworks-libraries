import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
  root: {
    padding: 20,
    '& p': { textAlign: 'center' },
  },
})

export const Kravich: React.FC = () => {
  const classes = useStyles()
  return (
    <Container className={classes.root}>
      <Typography variant="body1">
        Выполнил все пункты по ТЗ, вопросы лишь по material-UI т.к. библиотека
        большая и на освоение и правильной структуры требуется время.
      </Typography>
      <Typography variant="body1">
        Благодарю за возможность попрактиковаться с React-Redux (нравится эта
        парочка) и попробовать новые технологии.
      </Typography>
    </Container>
  )
}

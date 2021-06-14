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
        Выполнил все пункты ТЗ по реализации. Вопросы к правильному
        использованию Material-ui т.к. до этого проекта писал всё на обычном
        css.
      </Typography>
      <Typography variant="body1">
        Reject + react-testing-library в процессе. Осталось лишь это, но
        требуется время на изучение и применение на практике (ранее опыта не
        имел).
      </Typography>
      <Typography variant="body1">
        Благодарю за возможность попрактиковаться с React-Redux (нравится эта
        парочка) и попробовать новые технологии.
      </Typography>
    </Container>
  )
}

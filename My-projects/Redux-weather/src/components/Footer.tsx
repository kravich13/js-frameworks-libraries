import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 60,
    width: '100%',
    '& h3': {
      color: 'white',
      fontWeigh: 500,
      fontSize: 17,
    },
  },
})

export const Footer: React.FC = () => {
  const classes = useStyles()
  return (
    <footer style={{ background: '#3f51b1' }}>
      <Container className={classes.root}>
        <Typography component="h3">vladislav.onatskyi@gmail.com</Typography>
      </Container>
    </footer>
  )
}

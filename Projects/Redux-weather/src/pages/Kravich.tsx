import React from 'react'
import { Container, List, makeStyles, Typography } from '@material-ui/core'
import { ClassNameMap } from '@material-ui/styles'

const useStyles = makeStyles({
  root: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    padding: 20,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    '& div': { maxWidth: 800 },
    '& ul': {
      fontSize: 17,
      listStyle: 'inside',
      paddingLeft: 25,
      paddingTop: 3,
      '& ul': {
        listStyle: 'circle',
        marginLeft: 25,
        '& li': { marginBottom: 3 },
      },
    },
  },
  shortDescription: { paddingBottom: 10 },
})

export const Kravich: React.FC = () => {
  const classes: ClassNameMap<string> = useStyles()
  return (
    <Container className={classes.root}>
      <Container>
        <Typography variant="h5" className={classes.shortDescription}>
          Тестовое задание для React Dev
        </Typography>
        <Typography variant="body1" className={classes.shortDescription}>
          Задача: Реализовать SPA, показывающее погоду в выбранных городах.
        </Typography>
        <Typography variant="body1">Тех. задание:</Typography>

        <List>
          <li>
            Необходимо вывести список городов “карточками”. Карточка должна
            содержать следующий функционал:
            <List>
              <li>Краткая информация о погоде в городе</li>
              <li>
                При клике на карточку вывести детальную информацию / переход на
                страницу с детальной информацией
              </li>
              <li>
                На каждой карточке города должна присутствовать кнопка: обновить
                данные о погоде сейчас. При ее нажатии должно происходить
                обновление погоды данного города
              </li>
              <li>
                Должна быть возможность добавлять / удалять города. При
                добавлении нового города происходит запрос на получение текущей
                погоды и вывод его на экран.
              </li>
            </List>
          </li>
          <li>
            Данные хранить локально в LocalStorage.
            <List>
              <li>
                При перезагрузке страницы должен сохраниться список городов,
                ранее введенных пользователем, а данные о погоде должны быть
                обновлены.
              </li>
            </List>
          </li>
        </List>
        <Typography variant="body1">Будет плюсом:</Typography>
        <List>
          <li>
            На странице с подробным представлением реализовать положение блока с
            температурой, на основе величины значения. Для этого делать
            дополнительный запрос на получение почасового прогноза на текущий
            день.
          </li>
        </List>
      </Container>
    </Container>
  )
}

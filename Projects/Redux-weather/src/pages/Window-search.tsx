import React, { memo, useMemo } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Container, makeStyles } from '@material-ui/core'
import { ClassNameMap } from '@material-ui/styles'
import CitySearch from '../components/City-Search'
import { ListOfSities } from '../components/List-of-Cities'
import { ListEnteredCities } from '../components/ListEntered-Cities'
import {
  searchForMatches,
  item_selection_arrow,
  enteredCity,
  clearSearch,
} from '../redux/actions'
import { ImapDispatchToProps, ImapStateToProps } from '../interfaces'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    height: 'auto',
  },
})

const mapDispatchToProps: ImapDispatchToProps = {
  searchForMatches,
  item_selection_arrow,
  enteredCity,
  clearSearch,
}
const mapStateToProps = (state: ImapStateToProps) => {
  return {
    enteredCityMatches: state.search.enteredCityMatches,
    clickedItem: state.search.clickedItem,
    enteredCities: state.search.enteredCities,
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

const MemoListEnteredCities = memo(ListEnteredCities)

const WindowSearch: React.FC<PropsFromRedux> = ({
  enteredCityMatches,
  clickedItem,
  searchForMatches,
  enteredCities,
  item_selection_arrow,
  enteredCity,
  clearSearch,
}) => {
  const classes: ClassNameMap<string> = useStyles()
  const listCard = useMemo(() => enteredCities, [enteredCities])

  return (
    <Container className={classes.root}>
      <CitySearch
        clickedItem={clickedItem}
        item_selection_arrow={item_selection_arrow}
        enteredCity={enteredCity}
        clearSearch={clearSearch}
        searchForMatches={searchForMatches}
      />
      <ListOfSities enteredCityMatches={enteredCityMatches} />
      <MemoListEnteredCities enteredCities={listCard} />
    </Container>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(WindowSearch)

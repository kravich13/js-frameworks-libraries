import React, { memo, useMemo } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { CitySearch } from '../components/City-Search'
import { ListOfSities } from '../components/List-of-Cities'
import { ListEnteredCities } from '../components/ListEntered-Cities'
import { ImapDispatchToProps, ImapStateToProps } from '../interfaces'
import {
  searchForMatches,
  item_selection_arrow,
  enteredCity,
} from '../redux/actions'

const mapDispatchToProps: ImapDispatchToProps = {
  searchForMatches,
  item_selection_arrow,
  enteredCity,
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
}) => {
  const listCard = useMemo(() => enteredCities, [enteredCities])

  return (
    <React.Fragment>
      <CitySearch
        searchForMatches={searchForMatches}
        clickedItem={clickedItem}
        item_selection_arrow={item_selection_arrow}
        enteredCity={enteredCity}
      />
      <ListOfSities enteredCityMatches={enteredCityMatches} />
      <MemoListEnteredCities enteredCities={listCard} />
    </React.Fragment>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(WindowSearch)

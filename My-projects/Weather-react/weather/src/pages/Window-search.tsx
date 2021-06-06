import React from 'react'
import { connect } from 'react-redux'
import { CitySearch } from '../components/City-Search'
import { ListOfSities } from '../components/List-of-Cities'
import { searchForMatches } from '../redux/actions'

const mapDispatchToProps = { searchForMatches }
const mapStateToProps = (state: any) => {
  return {
    enteredCityMatches: state.search.enteredCityMatches,
    selectedItem: state.search.selectedItem,
    clickItem: state.search.clickItem,
  }
}

const WindowSearch: React.FC<any> = ({
  enteredCityMatches,
  searchForMatches,
  selectedItem,
  clickItem,
}) => {
  return (
    <React.Fragment>
      <CitySearch
        searchForMatches={searchForMatches}
        clickItem={clickItem}
        selectedItem={selectedItem}
      />
      <ListOfSities enteredCityMatches={enteredCityMatches} />
    </React.Fragment>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(WindowSearch)

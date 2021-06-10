import {
  IAllWeatherData_Result,
  ICitiesRed_ClickedItem,
  ICitiesRed_EnteredCities,
  ICitiesRed_EnteredCityMatches,
} from './redux/interfacesRedux'

export interface ImapStateToProps {
  search: {
    citiesWithCountry: string[]
    enteredCityMatches: ICitiesRed_EnteredCityMatches[]
    savedCities: []
    enteredCities: ICitiesRed_EnteredCities[]
    clickedItem: ICitiesRed_ClickedItem
    clickedItemDetails: null | IAllWeatherData_Result
  }
}
export interface ImapDispatchToProps {
  [keys: string]: Function
}

// ============= CITY-SEARCH =============
export interface ICitySearch_Props {
  clickedItem: ICitiesRed_ClickedItem
  item_selection_arrow: Function
  enteredCity: Function
  searchForMatches: Function
  clearSearch: Function
}

// ============= LIST-OF-CITY =============
export interface IListOfCity_Props {
  enteredCityMatches: ICitiesRed_EnteredCityMatches[]
}

// ============= LISTENTERED-CITY =============
export interface IListEnteredCity_Props {
  enteredCities: ICitiesRed_EnteredCities[]
}

// ============= CARD-CITY =============
export interface ICardCity_Props {
  stateCity: ICitiesRed_EnteredCities
}

// ============= FOUND-CITY =============
export interface IFounedCity_Props {
  stateCity: ICitiesRed_EnteredCityMatches
}

// ============= LIST-OF-TEMP =============
export interface IListOfTemp_Props {
  hoursTemp: number[]
}

// ============= CITIES REDUCER =============
export interface ICitiesRed_InitialState {
  citiesWithCountry: string[]
  enteredCityMatches: ICitiesRed_EnteredCityMatches[]
  enteredCities: ICitiesRed_EnteredCities[]
  clickedItem: ICitiesRed_ClickedItem
}

export interface ICitiesRed_ClickedItem extends ICitiesRed_CommonFields {
  default: boolean
}
export interface ICitiesRed_EnteredCities extends ICitiesRed_CommonFields {
  temp: number
  icon: string
}
export interface ICitiesRed_EnteredCityMatches extends ICitiesRed_CommonFields {
  selected: boolean
}
export interface ICitiesRed_CommonFields {
  id: null | number
  title: string
}

// ============= ACTIOSN =============
export interface IRes_GetAllCities {
  [keys: string]: string[]
}

export interface IGetAllCities_Coincidence {
  [keys: string]: string
}

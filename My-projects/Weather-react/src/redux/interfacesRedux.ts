// ============= CITIES REDUCER =============
export interface ICitiesRed_InitialState {
  citiesWithCountry: string[]
  enteredCityMatches: ICitiesRed_EnteredCityMatches[]
  enteredCities: ICitiesRed_EnteredCities[]
  clickedItem: ICitiesRed_ClickedItem
  clickedItemDetails: null | any
}

export interface ICitiesRed_Action {
  type: string
  payload: any
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

export interface IRepetitive_Payload {
  task: ICitiesRed_CommonFields
  weatherOfCity: any[]
}

export interface ICitiesRed_CommonFields {
  id: null | number
  title: string
}

export interface IAllWeatherData_Result {
  title: string
  icon: string
  weather: string
  weatherDesc: string
  high: number
  low: number
  temp: number
  wind: number
  pressure: string
  hoursTemp: string
}

// ============= ACTIONS =============
export interface IRes_GetAllCities {
  [keys: string]: string[]
}

export interface IGetAllCities_Coincidence {
  [keys: string]: string
}

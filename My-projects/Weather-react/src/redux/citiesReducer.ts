import {
  IRepetitive_Payload,
  ICitiesRed_Action,
  ICitiesRed_ClickedItem,
  ICitiesRed_EnteredCities,
  ICitiesRed_EnteredCityMatches,
  ICitiesRed_InitialState,
  ICitiesRed_CommonFields,
  IAllWeatherData_Result,
  IallWeatherData_Payload,
} from './interfacesRedux'
import {
  DELETE_CITY,
  CLICKED_ITEM,
  ENTERED_CITIES,
  GET_ALL_CITIES,
  ITEM_SELECTION_ARROW,
  SEARCH_FOR_MATCHES,
  UPDATE_WEATHER_DATA,
  ZEROING_SEARCH_DATA,
  GETTING_ADDED_CITIES,
  DETAILED_INFORMATION,
} from './types'

const initialState: ICitiesRed_InitialState = {
  citiesWithCountry: [],
  enteredCityMatches: [],
  enteredCities: [],
  clickedItem: { id: null, title: '', default: false },
  clickedItemDetails: null,
}

export const citiesReducer = (
  state = initialState,
  action: ICitiesRed_Action
): ICitiesRed_InitialState => {
  const { type, payload } = action

  switch (type) {
    case GET_ALL_CITIES:
      return { ...state, citiesWithCountry: payload }
    case GETTING_ADDED_CITIES:
      return { ...state, enteredCities: payload }
    case UPDATE_WEATHER_DATA:
      return updatedWeather(state, payload)
    case SEARCH_FOR_MATCHES:
      return searchForMatches(state, payload)
    case CLICKED_ITEM:
      return clicked_item(state, payload)
    case ITEM_SELECTION_ARROW:
      return item_selection_arrow(state, payload)
    case ENTERED_CITIES:
      return addedCity(state, payload)
    case DELETE_CITY:
      return deleteCity(state, payload)
    case DETAILED_INFORMATION:
      return allWeatherData(state, payload)
    case ZEROING_SEARCH_DATA:
      return {
        ...state,
        enteredCityMatches: [],
        clickedItem: { id: null, title: '', default: false },
      }
    default:
      return state
  }
}

function searchForMatches(
  state: ICitiesRed_InitialState,
  payload: string
): ICitiesRed_InitialState {
  if (payload.length < 2) return { ...state, enteredCityMatches: [] }

  const { citiesWithCountry } = state
  const foundMatches: ICitiesRed_EnteredCityMatches[] = []
  const userStr: string = payload.trim()

  citiesWithCountry.forEach((elem: string, index: number): void => {
    if (foundMatches.length >= 13) return

    const regCountry: RegExp = new RegExp(`,[ ][a-z]*${userStr}`, 'i')
    const countryExclusion: RegExpMatchArray | null = elem.match(regCountry)
    if (countryExclusion) return

    const regCity: RegExp = new RegExp(userStr, 'i')
    const search: RegExpMatchArray | null = elem.match(regCity)
    if (!search) return

    foundMatches.push({
      id: index,
      title: elem,
      selected: !foundMatches.length ?? false, // 0 index
    })
  })
  const activeElem: ICitiesRed_ClickedItem = {
    id: foundMatches[0]?.id ?? null,
    title: foundMatches[0]?.title ?? '',
    default: true,
  }

  return { ...state, enteredCityMatches: foundMatches, clickedItem: activeElem }
}

function clicked_item(
  state: ICitiesRed_InitialState,
  payload: ICitiesRed_EnteredCityMatches
): ICitiesRed_InitialState {
  const { id, title } = payload
  const newState = state.enteredCityMatches.map((elem) => {
    if (elem.selected) {
      return elem.id === id ? elem : { ...elem, selected: false }
    }
    return elem.id === id ? { ...elem, selected: true } : elem
  })

  return {
    ...state,
    enteredCityMatches: newState,
    clickedItem: { id, title, default: false },
  }
}

function item_selection_arrow(
  state: ICitiesRed_InitialState,
  payload: string
): ICitiesRed_InitialState {
  const { enteredCityMatches } = state
  const whereTo: string = payload
  let currentIndex: number = 0

  for (const elem of enteredCityMatches) {
    if (!elem.selected) continue

    currentIndex = enteredCityMatches.indexOf(elem)
    break
  }

  if (whereTo === 'ArrowUp') {
    if (currentIndex === 0) return state
    currentIndex--
  }
  if (whereTo === 'ArrowDown') {
    if (currentIndex >= enteredCityMatches.length - 1) return state
    currentIndex++
  }

  const { id, title } = enteredCityMatches[currentIndex]

  const newState = enteredCityMatches.map((elem) => {
    if (elem.selected) return { ...elem, selected: false }
    return elem.id === id ? { ...elem, selected: true } : elem
  })

  return {
    ...state,
    enteredCityMatches: newState,
    clickedItem: { id, title, default: false },
  }
}

function addedCity(
  state: ICitiesRed_InitialState,
  payload: IRepetitive_Payload
): ICitiesRed_InitialState {
  const { enteredCities } = state
  const { task, weatherOfCity } = payload

  if (!task?.id || !weatherOfCity.length) return state

  const thereIsSame = enteredCities.some((elem) => task.id === elem.id)
  if (thereIsSame) return state

  const weatherData: any = weatherOfCity[0]

  const addedData: ICitiesRed_EnteredCities = {
    ...task,
    temp: Math.round(weatherData.main.temp),
    icon: weatherData.weather[0].icon,
  }

  localStorage.setItem(
    'preservedCity',
    JSON.stringify(enteredCities.concat([addedData]))
  )

  return { ...state, enteredCities: enteredCities.concat([addedData]) }
}

function updatedWeather(
  state: ICitiesRed_InitialState,
  payload: IRepetitive_Payload
): ICitiesRed_InitialState {
  const { enteredCities } = state
  const { task, weatherOfCity } = payload
  if (!task?.id || !weatherOfCity.length) return state

  const weatherData: any = weatherOfCity[0]

  const newState = enteredCities.map((elem) => {
    if (elem.id !== task.id) return elem

    return {
      ...elem,
      temp: Math.round(weatherData.main.temp),
      icon: weatherData.weather[0].icon,
    }
  })

  localStorage.setItem('preservedCity', JSON.stringify(newState))
  return { ...state, enteredCities: newState }
}

function deleteCity(
  state: ICitiesRed_InitialState,
  payload: ICitiesRed_CommonFields
): ICitiesRed_InitialState {
  const { enteredCities } = state
  const newState = enteredCities.filter((elem) => elem.id !== payload.id)

  localStorage.setItem('preservedCity', JSON.stringify(newState))
  return { ...state, enteredCities: newState }
}

function allWeatherData(
  state: ICitiesRed_InitialState,
  payload: IallWeatherData_Payload
): ICitiesRed_InitialState {
  const { task, weatherOfCity, hours24Temp } = payload

  if (!task?.id || !weatherOfCity.length) return state

  const { main, weather, wind } = weatherOfCity[0]

  const result: IAllWeatherData_Result = {
    title: task.title,
    icon: weather[0].icon,
    weather: weather[0].main,
    weatherDesc: weather[0].description,
    high: Math.max(...hours24Temp) ?? 0,
    low: Math.min(...hours24Temp) ?? 0,
    temp: hours24Temp[0] ?? 0,
    wind: wind.speed,
    pressure: main.pressure,
    hoursTemp: hours24Temp,
  }

  return { ...state, clickedItemDetails: result }
}

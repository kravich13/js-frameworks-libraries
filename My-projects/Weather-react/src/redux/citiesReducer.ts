import {
  ICitiesRed_ClickedItem,
  ICitiesRed_EnteredCityMatches,
  ICitiesRed_InitialState,
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
} from './types'

const initialState: ICitiesRed_InitialState = {
  citiesWithCountry: [],
  enteredCityMatches: [],
  enteredCities: localStorage.preservedCity
    ? JSON.parse(localStorage.preservedCity)
    : [],
  clickedItem: { id: null, title: '', default: false },
}

export const citiesReducer = (
  state = initialState,
  action: any
): ICitiesRed_InitialState => {
  const { type, payload } = action

  switch (type) {
    case GET_ALL_CITIES:
      return { ...state, citiesWithCountry: payload }
    case UPDATE_WEATHER_DATA:
      return updatedWeather(state, payload)
    case SEARCH_FOR_MATCHES:
      return searchForMatches(state, payload)
    case CLICKED_ITEM:
      return clicked_item(state, payload)
    case ITEM_SELECTION_ARROW:
      return item_selection_arrow(state, payload)
    case ENTERED_CITIES:
      return enteredCities(state, payload)
    case DELETE_CITY:
      return deleteCity(state, payload)
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
    if (countryExclusion?.length) return

    const regCity: RegExp = new RegExp(userStr, 'i')
    const search: RegExpMatchArray | null = elem.match(regCity)

    if (search?.length) {
      foundMatches.push({
        id: index,
        title: elem,
        selected: !foundMatches.length ?? false, // 0 index
      })
    }
  })
  const activeElem: ICitiesRed_ClickedItem = {
    id: foundMatches[0]?.id ?? null,
    title: foundMatches[0]?.title ?? '',
    default: true,
  }

  return {
    ...state,
    enteredCityMatches: foundMatches,
    clickedItem: activeElem,
  }
}

function clicked_item(
  state: ICitiesRed_InitialState,
  payload: ICitiesRed_EnteredCityMatches
): ICitiesRed_InitialState {
  const newState = state.enteredCityMatches.map((elem) => {
    if (elem.selected) {
      return elem.id === payload.id ? elem : { ...elem, selected: false }
    }
    return elem.id === payload.id ? { ...elem, selected: true } : elem
  })

  return {
    ...state,
    enteredCityMatches: newState,
    clickedItem: { id: payload.id, title: payload.title, default: false },
  }
}

function item_selection_arrow(
  state: ICitiesRed_InitialState,
  payload: string
): ICitiesRed_InitialState {
  const { enteredCityMatches } = state
  const whereTo: string = payload
  let currentIndex: number = 0

  if (whereTo === 'ArrowUp' || whereTo === 'ArrowDown') {
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
      clickedItem: {
        id,
        title,
        default: false,
      },
    }
  }
  return state
}

function enteredCities(
  state: ICitiesRed_InitialState,
  payload: any
): ICitiesRed_InitialState {
  const { enteredCities } = state
  const { task, weatherOfCity } = payload

  if (!task?.id || !weatherOfCity) return state

  const thereIsSame = enteredCities.some((elem) => task.id === elem.id)
  if (thereIsSame) return state

  const addedData: any = {
    ...task,
    temp: Math.round(weatherOfCity.main.temp),
    icon: weatherOfCity.weather[0].icon,
  }

  localStorage.setItem(
    'preservedCity',
    JSON.stringify(enteredCities.concat([addedData]))
  )

  return { ...state, enteredCities: enteredCities.concat([addedData]) }
}

function updatedWeather(
  state: ICitiesRed_InitialState,
  payload: any
): ICitiesRed_InitialState {
  const { enteredCities } = state
  const { task, weatherOfCity } = payload
  if (!task?.id && !weatherOfCity) return state

  const newState = enteredCities.map((elem) => {
    if (elem.id !== task.id) return elem

    return {
      ...elem,
      temp: Math.round(weatherOfCity.main.temp),
      icon: weatherOfCity.weather[0].icon,
    }
  })
  return { ...state, enteredCities: newState }
}

function deleteCity(
  state: ICitiesRed_InitialState,
  payload: any
): ICitiesRed_InitialState {
  const { enteredCities } = state
  const newState = enteredCities.filter((elem) => elem.id !== payload.id)

  localStorage.setItem('preservedCity', JSON.stringify(newState))

  return { ...state, enteredCities: newState }
}

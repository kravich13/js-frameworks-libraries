import {
  ICitiesRed_ClickedItem,
  ICitiesRed_CommonFields,
  ICitiesRed_EnteredCityMatches,
  ICitiesRed_InitialState,
} from './interfacesRedux'
import {
  CLICKED_ITEM,
  ENTERED_CITIES,
  GET_ALL_CITIES,
  ITEM_SELECTION_ARROW,
  SEARCH_FOR_MATCHES,
  ZEROING_SEARCH_DATA,
} from './types'

const initialState: ICitiesRed_InitialState = {
  citiesWithCountry: [],
  enteredCityMatches: [],
  savedCities: [],
  enteredCities: [],
  clickedItem: { id: null, title: '', default: false },
}

export const citiesReducer = (
  state = initialState,
  action: any
): ICitiesRed_InitialState => {
  const { type, payload } = action

  switch (type) {
    case GET_ALL_CITIES:
      return { ...state, citiesWithCountry: Array.from(payload) }
    case SEARCH_FOR_MATCHES:
      return searchForMatches(state, payload)
    case CLICKED_ITEM:
      return clicked_item(state, payload)
    case ITEM_SELECTION_ARROW:
      return item_selection_arrow(state, payload)
    case ENTERED_CITIES:
      return enteredCities(state, payload)
    case ZEROING_SEARCH_DATA:
      return {
        ...state,
        enteredCityMatches: [],
        clickedItem: Object.assign({ id: null, title: '', default: false }),
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
    enteredCityMatches: Array.from(foundMatches),
    clickedItem: Object.assign(activeElem),
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
    enteredCityMatches: Array.from(newState),
    clickedItem: Object.assign({
      id: payload.id,
      title: payload.title,
      default: false,
    }),
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

    const requiredElem = enteredCityMatches[currentIndex]

    const newState = enteredCityMatches.map((elem) => {
      if (elem.selected) return { ...elem, selected: false }
      return elem.id === requiredElem.id ? { ...elem, selected: true } : elem
    })

    return {
      ...state,
      enteredCityMatches: Array.from(newState),
      clickedItem: Object.assign({
        id: requiredElem.id,
        title: requiredElem.title,
        default: false,
      }),
    }
  }
  return state
}

function enteredCities(
  state: ICitiesRed_InitialState,
  payload: ICitiesRed_CommonFields
): ICitiesRed_InitialState {
  const { enteredCities } = state

  const thereIsSame = enteredCities.some((elem): boolean => {
    return payload.id === elem.id ?? false
  })

  if (thereIsSame || !payload.id) return state

  return {
    ...state,
    enteredCities: enteredCities.concat({ ...payload, added: false }),
  }
}

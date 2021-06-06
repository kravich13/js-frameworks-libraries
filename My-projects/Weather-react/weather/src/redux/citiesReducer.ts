import {
  CLICKED_ITEM,
  GET_ALL_CITIES,
  SEARCH_FOR_MATCHES,
  SELECTED_ITEM,
} from './types'

const initialState = {
  citiesWithCountry: [],
  enteredCityMatches: [],
  citiesUser: [],
  selectedItem: '',
  clickItem: false,
}

export const citiesReducer = (state = initialState, action: any): any => {
  const { type, payload } = action

  switch (type) {
    case GET_ALL_CITIES:
      return { ...state, citiesWithCountry: Array.from(payload) }
    case SEARCH_FOR_MATCHES:
      return searchForMatches(state, payload)
    case SELECTED_ITEM:
      return { ...state, selectedItem: payload }
    case CLICKED_ITEM:
      return clicked_item(state, payload)
    default:
      return state
  }
}

function searchForMatches(state: any, str: string) {
  if (str.length < 2) return { ...state, enteredCityMatches: [] }

  const { citiesWithCountry } = state
  const foundMatches: any[] = []
  const userStr: string = str.trim()

  citiesWithCountry.forEach((elem: string, index: number): void => {
    if (foundMatches.length >= 13) return

    const regCountry = new RegExp(`,[ ][a-z]*${userStr}`, 'i')
    const countryExclusion = elem.match(regCountry)
    if (countryExclusion?.length) return

    const regCity = new RegExp(userStr, 'i')
    const search: RegExpMatchArray | null = elem.match(regCity)

    if (search?.length) {
      foundMatches.push({
        id: index,
        title: elem,
        selected: !foundMatches.length ?? false,
      })
    }
  })

  return { ...state, enteredCityMatches: Array.from(foundMatches) }
}

function clicked_item(state: any, idClick: number) {
  const newState = state.enteredCityMatches.map((elem: any) => {
    if (elem.selected) {
      return elem.id === idClick ? elem : { ...elem, selected: false }
    }
    return elem.id === idClick ? { ...elem, selected: true } : elem
  })

  return { ...state, enteredCityMatches: Array.from(newState) }
}

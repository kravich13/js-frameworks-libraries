import {
  ICitiesRed_CommonFields,
  IGetAllCities_Coincidence,
  IRes_GetAllCities,
} from './interfacesRedux'
import {
  CLICKED_ITEM,
  ENTERED_CITIES,
  GET_ALL_CITIES,
  ITEM_SELECTION_ARROW,
  SEARCH_FOR_MATCHES,
  ZEROING_SEARCH_DATA,
} from './types'

export function getAllCities(): Function {
  return async function (dispatch: Function): Promise<void> {
    try {
      const res: Response = await fetch(
        'https://raw.githubusercontent.com/David-Haim/CountriesToCitiesJSON/master/countriesToCities.json'
      )
      const countriesToCities: IRes_GetAllCities = await res.json()
      const citiesWithCountry: string[] = []
      const coincidence: IGetAllCities_Coincidence = {}

      Object.entries(countriesToCities).forEach(
        ([country, cities]: Array<string | any>): void => {
          cities.forEach((city: string): void => {
            if (city && !(`${city}, ${country}` in coincidence)) {
              const finalStr: string = `${city}, ${country}`
              coincidence[finalStr] = finalStr
              citiesWithCountry.push(finalStr)
            }
          })
        }
      )

      dispatch({ type: GET_ALL_CITIES, payload: citiesWithCountry })
    } catch (err) {
      dispatch({ type: GET_ALL_CITIES, payload: [] })
    }
  }
}

export function searchForMatches(task: string) {
  return { type: SEARCH_FOR_MATCHES, payload: task }
}

export function clicked_item(id: number, title: string) {
  return { type: CLICKED_ITEM, payload: { id, title } }
}

export function item_selection_arrow(task: string) {
  return { type: ITEM_SELECTION_ARROW, payload: task }
}
export function enteredCity(task: ICitiesRed_CommonFields): Function {
  return function (dispatch: Function): void {
    dispatch({ type: ENTERED_CITIES, payload: task })
    dispatch({ type: ZEROING_SEARCH_DATA })
  }
}

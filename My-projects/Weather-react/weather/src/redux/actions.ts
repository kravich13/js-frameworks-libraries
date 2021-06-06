import { IRes_GetAllCities } from './interfacesRedux'
import { CLICKED_ITEM, GET_ALL_CITIES, SEARCH_FOR_MATCHES } from './types'

export function getAllCities(): Function {
  return async function (dispatch: Function): Promise<void> {
    try {
      const res: Response = await fetch(
        'https://raw.githubusercontent.com/David-Haim/CountriesToCitiesJSON/master/countriesToCities.json'
      )
      const countriesToCities: IRes_GetAllCities = await res.json()
      const citiesWithCountry: string[] = []
      const coincidence: any = {}

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

export function clicked_item(id: number) {
  return {
    type: CLICKED_ITEM,
    payload: id,
  }
}

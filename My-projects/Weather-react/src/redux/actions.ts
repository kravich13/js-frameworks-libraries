import {
  ICitiesRed_CommonFields,
  IGetAllCities_Coincidence,
  IRes_GetAllCities,
} from './interfacesRedux'
import {
  DELETE_CITY,
  ENTERED_CITIES,
  GET_ALL_CITIES,
  ITEM_SELECTION_ARROW,
  SEARCH_FOR_MATCHES,
  UPDATE_WEATHER_DATA,
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

async function getWeatherOfCity(data: any): Promise<any | null> {
  try {
    const cityExtraction: RegExpMatchArray | null =
      data.title.match(/[ -a-z]*,/i)
    if (!cityExtraction?.length) return

    const cityName: string = cityExtraction![0].replace(',', '')

    const res: Response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=540f066413819eb44d83e625b723cf60`
    )
    return await res.json()
  } catch (err) {
    return null
  }
}

export function updatedWeather(task: ICitiesRed_CommonFields): Function {
  return async function (dispatch: Function): Promise<any> {
    try {
      const weatherOfCity: any | null = await getWeatherOfCity(task)
      dispatch({ type: UPDATE_WEATHER_DATA, payload: { task, weatherOfCity } })
    } catch (err) {
      return
    }
  }
}

export function searchForMatches(task: string) {
  return { type: SEARCH_FOR_MATCHES, payload: task }
}

export function item_selection_arrow(task: string) {
  return { type: ITEM_SELECTION_ARROW, payload: task }
}

export function enteredCity(task: ICitiesRed_CommonFields): Function {
  return async function (dispatch: Function): Promise<any | null> {
    try {
      const weatherOfCity: any | null = await getWeatherOfCity(task)
      dispatch({ type: ENTERED_CITIES, payload: { task, weatherOfCity } })
      dispatch({ type: ZEROING_SEARCH_DATA })
    } catch (err) {
      dispatch({ type: ZEROING_SEARCH_DATA })
    }
  }
}

export function changeEnteredCity(task: any) {
  return { type: DELETE_CITY, payload: task }
}

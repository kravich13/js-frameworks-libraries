import {
  IAllWeatherData_Obj,
  ICitiesRed_CommonFields,
  ICitiesRed_EnteredCities,
  IGetAllCities_Coincidence,
  IRes_GetAllCities,
} from './interfacesRedux'
import {
  DELETE_CITY,
  ENTERED_CITIES,
  GET_ALL_CITIES,
  ITEM_SELECTION_ARROW,
  SEARCH_FOR_MATCHES,
  GETTING_ADDED_CITIES,
  UPDATE_WEATHER_DATA,
  ZEROING_SEARCH_DATA,
  DETAILED_INFORMATION,
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

export function getSavedCities(): Function {
  return async function (dispatch: Function): Promise<void | void> {
    try {
      const dataExists: string | undefined = localStorage.preservedCity
      if (!dataExists?.length) return

      const savedCities: ICitiesRed_EnteredCities[] = JSON.parse(
        localStorage.preservedCity
      )
      const weatherOfCities: any[] = await getWeatherOfCity(savedCities)
      const newState: ICitiesRed_EnteredCities[] = []

      for (let i: number = 0; i < savedCities.length; i++) {
        newState.push({
          ...savedCities[i],
          temp: Math.round(weatherOfCities[i].main.temp),
          icon: weatherOfCities[i].weather[0].icon,
        })
      }

      dispatch({ type: GETTING_ADDED_CITIES, payload: newState })
    } catch (err) {
      return
    }
  }
}

export function enteredCity(task: ICitiesRed_CommonFields): Function {
  return async function (dispatch: Function): Promise<void> {
    try {
      const weatherOfCity: any[] = await getWeatherOfCity([task])

      dispatch({ type: ENTERED_CITIES, payload: { task, weatherOfCity } })
      dispatch(clearSearch())
    } catch (err) {
      dispatch(clearSearch())
    }
  }
}

export function updatedWeather(task: ICitiesRed_CommonFields): Function {
  return async function (dispatch: Function): Promise<void> {
    try {
      const weatherOfCity: any[] = await getWeatherOfCity([task])

      dispatch({
        type: UPDATE_WEATHER_DATA,
        payload: { task, weatherOfCity },
      })
    } catch (err) {
      return
    }
  }
}

export function detailedInformation(task: ICitiesRed_CommonFields): Function {
  return async function (dispatch: Function): Promise<void> {
    try {
      const weatherOfCity: any[] = await getWeatherOfCity([task])
      const threeHourInterval: IAllWeatherData_Obj[] = await hourlyWeatherData(
        task
      )

      dispatch({
        type: DETAILED_INFORMATION,
        payload: { task, weatherOfCity, threeHourInterval },
      })
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

export function deleteCity(task: ICitiesRed_CommonFields) {
  return { type: DELETE_CITY, payload: task }
}

export function clearSearch() {
  return { type: ZEROING_SEARCH_DATA, payload: '' }
}

async function getWeatherOfCity(
  data: ICitiesRed_EnteredCities[] | ICitiesRed_CommonFields[]
): Promise<any[]> {
  try {
    if (!data?.length) return []

    const weatherOfCities: any = []

    for (const dataCity of data) {
      const cityExtraction: RegExpMatchArray | null =
        dataCity.title.match(/[ -a-z]*,/i)
      if (!cityExtraction) continue

      const cityName: string = cityExtraction![0].replace(',', '')
      const res: Response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=540f066413819eb44d83e625b723cf60`
      )

      if (res.status === 200) weatherOfCities.push(await res.json())
    }

    return weatherOfCities
  } catch (err) {
    return []
  }
}

async function hourlyWeatherData(
  data: ICitiesRed_CommonFields
): Promise<IAllWeatherData_Obj[]> {
  try {
    if (!data) return []

    const cityExtraction: RegExpMatchArray | null =
      data.title.match(/[ -a-z]*,/i)
    if (!cityExtraction) return []

    const cityName: string = cityExtraction[0]

    const res: Response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=540f066413819eb44d83e625b723cf60`
    )

    if (res.status !== 200) return []

    const resJson = await res.json()
    if (!Array.isArray(resJson.list)) return []

    const result: IAllWeatherData_Obj[] = []

    resJson.list.forEach((elem: any, index: number) => {
      if (index > 11) return

      const obj: IAllWeatherData_Obj = {
        temp: Math.round(elem.main.temp),
        fullDate: elem.dt_txt,
      }

      // result.push(Math.round(elem.main.temp))
      result.push(obj)
    })

    return result
  } catch (err) {
    return []
  }
}

import { weatherApiUrl } from '@/config'
import { getWeatherDescription } from '@/lib/weatherСode'
import { WeatherServiceArgs } from '@/types/other'
import {
	CurrentWeatherForecastApiResponse,
	YesterdayTemperatureApiResponse,
} from '@/types/wetherForecastApiResponse'
import { CurrentWeatherForecast } from '@/types/wetherForecastServiceReturn'

export const getCurrentWeatherForecast = async ({
	lat,
	lon,
	weatherModel,
}: WeatherServiceArgs): Promise<CurrentWeatherForecast | undefined> => {
	try {
		const paramModel =
			weatherModel && weatherModel !== 'default'
				? '&' + new URLSearchParams({ model: weatherModel }).toString()
				: ''

		const paramsCurrentWeather = new URLSearchParams({
			latitude: lat.toString(),
			longitude: lon.toString(),
			current:
				'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m',
			wind_speed_unit: 'ms',
			timezone: 'Europe/Moscow',
			forecast_days: '1',
		})

		const paramsYesterdayTemperature = new URLSearchParams({
			latitude: lat.toString(),
			longitude: lon.toString(),
			hourly: 'temperature_2m',
			wind_speed_unit: 'ms',
			timezone: 'Europe/Moscow',
			past_days: '1',
			forecast_days: '1',
		})

		const response = await fetch(
			weatherApiUrl.toString() + '?' + paramsCurrentWeather.toString() + paramModel,
		)
		const data = (await response.json()) as CurrentWeatherForecastApiResponse

		const date = new Date(data.current.time)

		const yesterdayTemperatureResponse = await fetch(
			weatherApiUrl.toString() + '?' + paramsYesterdayTemperature.toString() + paramModel,
		)
		const yesterdayTemperatureData =
			(await yesterdayTemperatureResponse.json()) as YesterdayTemperatureApiResponse

		const weatherCode = data.current.weather_code
		const weatherDescription = getWeatherDescription(weatherCode, data.current.is_day)

		const dayOfTheWeek = date.getDay() !== 0 ? date.getDay() - 1 : 6
		const nameDay = [
			'Понедельник',
			'Вторник',
			'Среда',
			'Четверг',
			'Пятница',
			'Суббота',
			'Воскресенье',
		][dayOfTheWeek]

		const currentHours = new Date().getHours()
		const yesterdayTemperatureAllHours = yesterdayTemperatureData.hourly.time.map((time) => {
			return new Date(time).getHours()
		})

		const yesterdayTemperatureIndex = yesterdayTemperatureAllHours.findIndex(
			(time) => time === currentHours,
		)

		const responseData: CurrentWeatherForecast = {
			nameDay: nameDay,
			elevation: data.elevation,
			interval: data.current.interval,
			temperature: (data.current.temperature_2m = Math.round(data.current.temperature_2m)),
			relativeHumidity: Math.round(data.current.relative_humidity_2m),
			yesterdayTemperature: Math.round(
				yesterdayTemperatureData.hourly.temperature_2m[yesterdayTemperatureIndex],
			),
			windSpeed: (data.current.wind_speed_10m = Math.round(data.current.wind_speed_10m)),
			weatherCode: data.current.weather_code,
			windDirection: (data.current.wind_direction_10m = Math.round(
				data.current.wind_direction_10m,
			)),
			time: String(date.getHours() + ':' + date.getMinutes()),
			weatherDescription: weatherDescription.description,
			weatherIcon: weatherDescription.image,
			isDay: data.current.is_day === 1 ? true : false,
			precipitation: data.current.precipitation,
			apparentTemperature: (data.current.apparent_temperature = Math.round(
				data.current.apparent_temperature,
			)),
		}

		return responseData
	} catch (error) {
		console.error('Error fetching current weather forecast: ', error)
		return undefined
	}
}

import { getWeatherDescription } from '@/lib/weatherСode'
import {
	CurrentWeatherForecastApiResponse,
	YesterdayTemperatureApiResponse,
} from '@/types/wetherForecastApiResponse'
import { CurrentWeatherForecast } from '@/types/wetherForecastServiceReturn'

export const getCurrentWeatherForecast = async ({
	lat,
	lon,
}: {
	lat: number
	lon: number
}): Promise<CurrentWeatherForecast | undefined> => {
	try {
		const response = await fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m&wind_speed_unit=ms&timezone=Europe%2FMoscow&forecast_days=1`,
			
		)
		const data = (await response.json()) as CurrentWeatherForecastApiResponse

		const date = new Date(data.current.time)

		const yesterdayTemperatureResponse = await fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&wind_speed_unit=ms&timezone=Europe%2FMoscow&past_days=1&forecast_days=1`,
			
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
			temperature: data.current.temperature_2m,
			relativeHumidity: data.current.relative_humidity_2m,
			yesterdayTemperature:
				yesterdayTemperatureData.hourly.temperature_2m[yesterdayTemperatureIndex],
			windSpeed: data.current.wind_speed_10m,
			weatherCode: data.current.weather_code,
			windDirection: data.current.wind_direction_10m,
			time: String(date.getHours() + ':' + date.getMinutes()),
			weatherDescription: weatherDescription.description,
			weatherIcon: weatherDescription.image,
			isDay: data.current.is_day === 1 ? true : false,
			precipitation: data.current.precipitation,
			apparentTemperature: data.current.apparent_temperature,
		}

		return responseData
	} catch (error) {
		console.error('Error fetching current weather forecast: ', error)
		return undefined
	}
}

import { getWeatherDescription } from '@/lib/weatherСode'
import { HourlyWeatherForecastApiResponse } from '@/types/wetherForecastApiResponse'
import { HourlyWeatherForecast } from '@/types/wetherForecastServiceReturn'

export const getHourlyWeatherForecast = async ({
	lat,
	lon,
}: {
	lat: number
	lon: number
}): Promise<HourlyWeatherForecast | undefined> => {
	try {
		const response = await fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation_probability,weather_code&wind_speed_unit=ms&timezone=Europe%2FMoscow&forecast_days=1`,
		)
		const data = (await response.json()) as HourlyWeatherForecastApiResponse

		const currentHour = new Date().getHours()

		const responseData: HourlyWeatherForecast = {
			hourly: data.hourly.time.map((time, index) => {
				const weatherCode = data.hourly.weather_code[index]

				const date = new Date(time)

				const isDay = date.getHours() >= 6 && date.getHours() <= 18
				const weatherData = getWeatherDescription(weatherCode, isDay ? 1 : 0)

				return {
					time: currentHour === date.getHours() ? 'Сейчас' : String(date.getHours() + ':00'),
					temperature: data.hourly.temperature_2m[index],
					precipitationProbability: data.hourly.precipitation_probability[index],
					weatherCode: data.hourly.weather_code[index],
					weatherDescription: weatherData.description,
					weatherIcon: weatherData.image,
				}
			}),
		}

		return responseData
	} catch (error) {
		console.log('Get hourly weather error', error)
		return undefined
	}
}

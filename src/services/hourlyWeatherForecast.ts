import { weatherApiUrl } from '@/config'
import { getWeatherDescription } from '@/lib/weatherСode'
import type { WeatherServiceArgs } from '@/types/other'
import type { HourlyWeatherForecastApiResponse } from '@/types/wetherForecastApiResponse'
import type { HourlyWeatherForecast } from '@/types/wetherForecastServiceReturn'

export const getHourlyWeatherForecast = async ({
	lat,
	lon,
	weatherModel,
}: WeatherServiceArgs): Promise<HourlyWeatherForecast | undefined> => {
	try {
		const paramModel =
			weatherModel && weatherModel !== 'default'
				? '&' + new URLSearchParams({ model: weatherModel }).toString()
				: ''

		const params = new URLSearchParams({
			latitude: lat.toString(),
			longitude: lon.toString(),
			hourly: 'temperature_2m,precipitation_probability,weather_code',
			wind_speed_unit: 'ms',
			timezone: 'Europe/Moscow',
			forecast_days: '1',
		})

		const response = await fetch(weatherApiUrl.toString() + '?' + params.toString() + paramModel)
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
					isCurrentTime: currentHour === date.getHours(),

					temperature: Math.round(data.hourly.temperature_2m[index]),
					precipitationProbability: data.hourly.precipitation_probability[index],
					weatherCode: data.hourly.weather_code[index],
					weatherDescription: weatherData.description,
					weatherIcon: weatherData.image,
				}
			}),
			isCurrentTimeItmeId: currentHour,
		}

		return responseData
	} catch (error) {
		console.log('Get hourly weather error', error)
		return undefined
	}
}

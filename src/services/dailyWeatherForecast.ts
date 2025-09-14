import { weatherApiUrl } from '@/config'
import { WeatherDescription, getWeatherDescription } from '@/lib/weatherСode'
import type { WeatherServiceArgs } from '@/types/other'
import type { DailyWeatherForecastApiResponse } from '@/types/wetherForecastApiResponse'
import type { DailyWeatherForecast } from '@/types/wetherForecastServiceReturn'

export const getDailyWeatherForecast = async ({
	lat,
	lon,
	days,
	weatherModel,
}: WeatherServiceArgs & { days: number }): Promise<DailyWeatherForecast> => {
	try {
		const paramModel =
			weatherModel && weatherModel !== 'default'
				? '&' + new URLSearchParams({ model: weatherModel }).toString()
				: ''

		const params = new URLSearchParams({
			latitude: lat.toString(),
			longitude: lon.toString(),
			daily:
				'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant',
			wind_speed_unit: 'ms',
			timezone: 'Europe/Moscow',
			forecast_days: String(days),
		})

		const response = await fetch(weatherApiUrl.toString() + '?' + params.toString() + paramModel)
		const data = (await response.json()) as DailyWeatherForecastApiResponse

		console.log('Daily Weather API response:', data)

		if (!response.ok) {
			throw new Error('Failed to fetch daily weather forecast')
		}

		const responseData: DailyWeatherForecast = {
			daily: data.daily.time.map((time, index) => {
				const weatherCode = data.daily.weather_code[index]

				const date = new Date(time)

				let weatherData: WeatherDescription

				const isDay = date.getHours() >= 6 && date.getHours() <= 18

				if (weatherCode === undefined) {
					weatherData = { description: '', image: '', short: '' }
				} else {
					weatherData = getWeatherDescription(weatherCode, isDay ? 1 : 0)
				}

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

				return {
					date:
						String(date.getDate()).padStart(2, '0') +
						'.' +
						String(date.getMonth() + 1).padStart(2, '0'),
					nameDay: nameDay,
					minTemp: Math.round(data.daily.temperature_2m_min[index]),
					maxTemp: Math.round(data.daily.temperature_2m_max[index]),
					precipitationProbability: Math.round(data.daily.precipitation_probability_max[index]),
					weatherCode: data.daily.weather_code[index],
					weatherDescription: weatherData?.description,
					weatherIcon: weatherData?.image,
					windSpeed: data.daily.wind_speed_10m_max[index],
					windDirection: data.daily.wind_direction_10m_dominant[index],
				}
			}),

			averageMinTemp: Math.round(
				data.daily.temperature_2m_min.reduce((a, b) => a + b, 0) /
					data.daily.temperature_2m_min.length,
			),

			averageMaxTemp: Math.round(
				data.daily.temperature_2m_max.reduce((a, b) => a + b, 0) /
					data.daily.temperature_2m_max.length,
			),
			averagePrecipitation: Math.round(
				data.daily.precipitation_probability_max.reduce((a, b) => a + b, 0) /
					data.daily.precipitation_probability_max.length,
			),
			averageWindSpeed: Math.round(
				data.daily.wind_speed_10m_max.reduce((a, b) => a + b, 0) /
					data.daily.wind_speed_10m_max.length,
			),
			averageWindDirection: Math.round(
				data.daily.wind_direction_10m_dominant.reduce((a, b) => a + b, 0) /
					data.daily.wind_direction_10m_dominant.length,
			),
		}

		return responseData
	} catch (error) {
		console.log(error)
		throw new Error(String(error))
	}
}

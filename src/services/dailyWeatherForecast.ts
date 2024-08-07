import { weatherApiUrl } from '@/config'
import { getWeatherDescription } from '@/lib/weatherСode'
import { WeatherServiceArgs } from '@/types/other'
import { DailyWeatherForecastApiResponse } from '@/types/wetherForecastApiResponse'
import { DailyWeatherForecast } from '@/types/wetherForecastServiceReturn'

export const getDailyWeatherForecast = async ({
	lat,
	lon,
	days,
	weatherModel,
}: WeatherServiceArgs & { days: number }): Promise<DailyWeatherForecast | undefined> => {
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

		const responseData: DailyWeatherForecast = {
			daily: data.daily.time.map((time, index) => {
				const weatherCode = data.daily.weather_code[index]

				const date = new Date(time)

				const isDay = date.getHours() >= 6 && date.getHours() <= 18
				const weatherData = getWeatherDescription(weatherCode, isDay ? 1 : 0)

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
					minTemp: data.daily.temperature_2m_min[index],
					maxTemp: data.daily.temperature_2m_max[index],
					precipitationProbability: data.daily.precipitation_probability_max[index],
					weatherCode: data.daily.weather_code[index],
					weatherDescription: weatherData.description,
					weatherIcon: weatherData.image,
					windSpeed: data.daily.wind_speed_10m_max[index],
					windDirection: data.daily.wind_direction_10m_dominant[index],
				}
			}),
		}

		return responseData
	} catch (error) {
		console.log('Daily weather forecast error: ', error)
		return undefined
	}
}

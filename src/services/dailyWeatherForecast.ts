import { getWeatherDescription } from '@/lib/weatherСode'
import { DailyWeatherForecastApiResponse } from '@/types/wetherForecastApiResponse'
import { DailyWeatherForecast } from '@/types/wetherForecastServiceReturn'

export const getDailyWeatherForecast = async ({
	lat,
	lon,
	days,
}: {
	lat: number
	lon: number
	days: number
}): Promise<DailyWeatherForecast | undefined> => {
	try {
		const response = await fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&timezone=Europe%2FMoscow&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant&wind_speed_unit=ms&forecast_days=${days}`,
		)

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

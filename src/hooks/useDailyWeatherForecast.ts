import { useState } from 'react'

import { getDailyWeatherForecast } from '@/services/dailyWeatherForecast'
import { WeatherServiceArgs } from '@/types/other'
import { DailyWeatherForecast } from '@/types/wetherForecastServiceReturn'

export const useDailyWeatherForecast = () => {
	const [weatherForecast, setWeatherForecast] = useState<DailyWeatherForecast>()
	const [loading, setLoading] = useState(false)

	async function getWeatherForecast({
		lat,
		lon,
		days,
		weatherModel,
	}: WeatherServiceArgs & { days: number }) {
		setLoading(true)
		await getDailyWeatherForecast({ lat, lon, days, weatherModel })
			.then((data) => {
				setWeatherForecast(data)
			})
			.catch((error) => {
				console.log(error)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	return { weatherForecast, weatherLoading: loading, getWeatherForecast }
}

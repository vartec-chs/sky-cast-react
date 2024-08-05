import { useState } from 'react'

import { getDailyWeatherForecast } from '@/services/dailyWeatherForecast'
import { DailyWeatherForecast } from '@/types/wetherForecastServiceReturn'

export const useDailyWeatherForecast = () => {
	const [weatherForecast, setWeatherForecast] = useState<DailyWeatherForecast>()
	const [loading, setLoading] = useState(false)

	async function getWeatherForecast({
		lat,
		lon,
		days,
	}: {
		lat: number
		lon: number
		days: number
	}) {
		setLoading(true)
		await getDailyWeatherForecast({ lat, lon, days })
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

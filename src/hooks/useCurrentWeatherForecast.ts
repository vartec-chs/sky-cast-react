import { useState } from 'react'

import { getCurrentWeatherForecast } from '@/services/currentWeatherForecast'
import { CurrentWeatherForecast } from '@/types/wetherForecastServiceReturn'

export const useCurrentWeatherForecast = () => {
	const [weatherForecast, setWeatherForecast] = useState<CurrentWeatherForecast>()
	const [loading, setLoading] = useState(false)

	async function getWeatherForecast({ lat, lon }: { lat: number; lon: number }) {
		setLoading(true)
		await getCurrentWeatherForecast({ lat, lon })
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

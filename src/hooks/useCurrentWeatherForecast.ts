import { useState } from 'react'

import { getCurrentWeatherForecast } from '@/services/currentWeatherForecast'
import { WeatherServiceArgs } from '@/types/other'
import { CurrentWeatherForecast } from '@/types/wetherForecastServiceReturn'

export const useCurrentWeatherForecast = () => {
	const [weatherForecast, setWeatherForecast] = useState<CurrentWeatherForecast | undefined>(
		undefined,
	)
	const [loading, setLoading] = useState(true)

	async function getWeatherForecast({ lat, lon, weatherModel }: WeatherServiceArgs) {
		setLoading(true)

		await getCurrentWeatherForecast({ lat, lon, weatherModel })
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

import { useState } from 'react'

import { getHourlyWeatherForecast } from '@/services/hourlyWeatherForecast'
import { WeatherServiceArgs } from '@/types/other'
import { HourlyWeatherForecast } from '@/types/wetherForecastServiceReturn'

export const useHourlyWeatherForecast = () => {
	const [weatherForecast, setWeatherForecast] = useState<HourlyWeatherForecast>()
	const [loading, setLoading] = useState(false)

	async function getWeatherForecast({ lat, lon, weatherModel }: WeatherServiceArgs) {
		setLoading(true)
		await getHourlyWeatherForecast({ lat, lon, weatherModel })
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

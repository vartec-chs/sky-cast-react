import { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'

import { getDailyWeatherForecast } from '@/services/dailyWeatherForecast'
import { WeatherServiceArgs } from '@/types/other'
import { DailyWeatherForecast } from '@/types/wetherForecastServiceReturn'

export const useDailyWeatherForecast = () => {
	const [params, setParams] = useState<(WeatherServiceArgs & { days: number }) | null>(null)
	const queryClient = useQueryClient()

	const query = useQuery<DailyWeatherForecast | undefined, Error>(
		['dailyWeatherForecast', params],
		async () => {
			if (!params) return undefined
			return getDailyWeatherForecast(params)
		},
		{ enabled: !!params },
	)

	async function getWeatherForecast({
		lat,
		lon,
		days,
		weatherModel,
	}: WeatherServiceArgs & { days: number }) {
		const newParams = { lat, lon, days, weatherModel }
		setParams(newParams)

		try {
			const data = await queryClient.fetchQuery(['dailyWeatherForecast', newParams], () =>
				getDailyWeatherForecast(newParams),
			)
			return data
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	return {
		weatherForecast: query.data,
		weatherLoading: query.isLoading || query.isFetching,
		getWeatherForecast,
	}
}

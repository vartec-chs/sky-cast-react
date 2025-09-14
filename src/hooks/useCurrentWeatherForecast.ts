import { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'

import { getCurrentWeatherForecast } from '@/services/currentWeatherForecast'
import type { WeatherServiceArgs } from '@/types/other'
import type { CurrentWeatherForecast } from '@/types/wetherForecastServiceReturn'

export const useCurrentWeatherForecast = () => {
	const [params, setParams] = useState<WeatherServiceArgs | null>(null)
	const queryClient = useQueryClient()

	const query = useQuery<CurrentWeatherForecast | undefined, Error>(
		['currentWeatherForecast', params],
		async () => {
			if (!params) return undefined
			return getCurrentWeatherForecast(params)
		},
		{ enabled: !!params, refetchOnWindowFocus: false },
	)

	async function getWeatherForecast({ lat, lon, weatherModel }: WeatherServiceArgs) {
		const newParams = { lat, lon, weatherModel }
		setParams(newParams)

		try {
			const data = await queryClient.fetchQuery(['currentWeatherForecast', newParams], () =>
				getCurrentWeatherForecast(newParams),
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

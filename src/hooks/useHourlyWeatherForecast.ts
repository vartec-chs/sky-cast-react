import { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'

import { getHourlyWeatherForecast } from '@/services/hourlyWeatherForecast'
import { WeatherServiceArgs } from '@/types/other'
import { HourlyWeatherForecast } from '@/types/wetherForecastServiceReturn'

export const useHourlyWeatherForecast = () => {
	const [params, setParams] = useState<WeatherServiceArgs | null>(null)
	const queryClient = useQueryClient()

	const query = useQuery<HourlyWeatherForecast | undefined, Error>(
		['hourlyWeatherForecast', params],
		async () => {
			if (!params) return undefined
			return getHourlyWeatherForecast(params)
		},
		{ enabled: !!params },
	)

	async function getWeatherForecast({ lat, lon, weatherModel }: WeatherServiceArgs) {
		const newParams = { lat, lon, weatherModel }
		setParams(newParams)

		try {
			const data = await queryClient.fetchQuery(['hourlyWeatherForecast', newParams], () =>
				getHourlyWeatherForecast(newParams),
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

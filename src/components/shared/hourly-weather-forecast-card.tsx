import { FC, useEffect } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { Skeleton } from '../ui/skeleton'
import { OneHourWeatherForecastCard } from './hour-weather-forecast-card'
import { useHourlyWeatherForecast } from '@/hooks/useHourlyWeatherForecast'
import { useUserLocality } from '@/hooks/useUserLocality'
import { cn } from '@/lib/utils'
import { PropsWithClassName } from '@/types/other'

export const HourlyWeatherForecastCard: FC<PropsWithClassName> = ({ className }) => {
	const [locality, weatherModel] = useUserLocality((state) => [state.locality, state.weatherModel])
	const { getWeatherForecast, weatherLoading, weatherForecast } = useHourlyWeatherForecast()

	const isRendered = !(!weatherLoading && Boolean(weatherForecast))

	useEffect(() => {
		if (locality) {
			getWeatherForecast({ lat: Number(locality.lat), lon: Number(locality.lon), weatherModel })
		}
	}, [locality])

	return (
		<Card className={cn('rounded-3xl relative p-0 w-full min-h-[240px]', className)}>
			<CardHeader className='p-4'>
				<CardTitle>Температура</CardTitle>
				<CardDescription>Средняя на сегодня по часа</CardDescription>
			</CardHeader>
			<CardContent className='grid grid-cols-1 p-0 px-4 pb-4 '>
				<ScrollArea className='w-full whitespace-nowrap'>
					<div className='flex gap-2'>
						{isRendered
							? new Array(24).fill(null).map((_, i) => <Skeleton key={i} className='w-20 h-36' />)
							: weatherForecast &&
								weatherForecast.hourly.map((item, i) => (
									<OneHourWeatherForecastCard
										key={i}
										time={item.time}
										icon={item.weatherIcon}
										temperature={item.temperature}
										precipitationProbability={item.precipitationProbability}
									/>
								))}
					</div>
					<ScrollBar orientation='horizontal' />
				</ScrollArea>
			</CardContent>
		</Card>
	)
}

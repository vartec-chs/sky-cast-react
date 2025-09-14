import { FC, useEffect, useRef } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card'
import { ScrollArea, ScrollBar } from '../../ui/scroll-area'
import { Skeleton } from '../../ui/skeleton'
import { OneHourWeatherForecastCard } from './hour-weather-forecast-card'
import { useHourlyWeatherForecast } from '@/hooks/useHourlyWeatherForecast'
import { useUserLocality } from '@/hooks/useUserLocality'
import { cn } from '@/lib/utils'
import  type { PropsWithClassName } from '@/types/other'

export const HourlyWeatherForecastCard: FC<PropsWithClassName> = ({ className }) => {
	const locality = useUserLocality((state) => state.locality)
	const weatherModel = useUserLocality((state) => state.weatherModel)
	const { getWeatherForecast, weatherLoading, weatherForecast } = useHourlyWeatherForecast()

	const scrollRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const currentItemId = weatherForecast?.isCurrentTimeItmeId
		console.log(currentItemId)
		if (scrollRef.current) {
			if (currentItemId) {
				scrollRef.current.scrollTo({ left: currentItemId * 80 })
			}
		}
	}, [weatherForecast])

	const isRendered = !(!weatherLoading && Boolean(weatherForecast))

	useEffect(() => {
		if (locality) {
			getWeatherForecast({ lat: Number(locality.lat), lon: Number(locality.lon), weatherModel })
		}
	}, [locality])

	return (
		<Card className={cn('relative min-h-[240px] w-full rounded-3xl p-0', className)}>
			<CardHeader className='p-4'>
				<CardTitle>Температура</CardTitle>
				<CardDescription>Средняя на сегодня по часа</CardDescription>
			</CardHeader>
			<CardContent className='grid grid-cols-1 p-0 px-2 pb-2'>
				<ScrollArea ref={scrollRef} className='w-full whitespace-nowrap'>
					<div className='flex gap-2'>
						{isRendered
							? new Array(24).fill(null).map((_, i) => <Skeleton key={i} className='h-36 w-20' />)
							: weatherForecast &&
								weatherForecast.hourly.map((item, i) => (
									<OneHourWeatherForecastCard
										key={i}
										time={item.time}
										icon={item.weatherIcon}
										temperature={item.temperature}
										precipitationProbability={item.precipitationProbability}
										description={item.weatherDescription}

									/>
								))}
					</div>
					<ScrollBar orientation='horizontal' />
				</ScrollArea>
			</CardContent>
		</Card>
	)
}

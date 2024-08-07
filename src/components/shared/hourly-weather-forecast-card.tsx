import { FC, useEffect } from 'react'

import { LoaderPinwheel } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { OneHourWeatherForecastCard } from './hour-weather-forecast-card'
import { useHourlyWeatherForecast } from '@/hooks/useHourlyWeatherForecast'
import { useUserLocality } from '@/hooks/useUserLocality'
import { cn } from '@/lib/utils'
import { PropsWithClassName } from '@/types/other'

export const HourlyWeatherForecastCard: FC<PropsWithClassName> = ({ className }) => {
	const [locality, weatherModel] = useUserLocality((state) => [state.locality, state.weatherModel])
	const { getWeatherForecast, weatherLoading, weatherForecast } = useHourlyWeatherForecast()

	useEffect(() => {
		if (locality) {
			getWeatherForecast({ lat: Number(locality.lat), lon: Number(locality.lon), weatherModel })
		}
	}, [locality])

	return (
		<Card className={cn('rounded-3xl relative p-0 w-full min-h-[240px]', className)}>
			{weatherLoading ? (
				<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
					<LoaderPinwheel className='animate-spin ' size={32} />
				</div>
			) : weatherForecast ? (
				<>
					<CardHeader className='p-4'>
						<CardTitle>Температура</CardTitle>
						<CardDescription>Средняя за 24 часа</CardDescription>
					</CardHeader>
					<CardContent className='grid grid-cols-1 p-0 px-4 pb-4 '>
						<ScrollArea className='w-full whitespace-nowrap'>
							<div className='flex gap-2'>
								{weatherForecast &&
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
				</>
			) : (
				<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
					<h6 className='text-center'>Нет данных</h6>
				</div>
			)}
		</Card>
	)
}

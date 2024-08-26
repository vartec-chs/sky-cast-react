import { FC, useState } from 'react'
import { useQuery } from 'react-query'

import { LoaderPinwheel } from 'lucide-react'

import { DayWeatherForecastCard } from '../shared/day-weather-forecast-card'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'
import { useUserLocality } from '@/hooks/useUserLocality'
import { cn } from '@/lib/utils'
import { getDailyWeatherForecast } from '@/services/dailyWeatherForecast'
import { PropsWithClassName } from '@/types/other'
import { DailyWeatherForecast } from '@/types/wetherForecastServiceReturn'

export const ManyDayWeatherForecastSection: FC<PropsWithClassName> = ({ className }) => {
	const [locality, weatherModel] = useUserLocality((state) => [state.locality, state.weatherModel])

	const [dayForecast, setDayForecast] = useState('3')

	const query = useQuery<DailyWeatherForecast, Error>({
		queryKey: ['daily-weather-forecast', locality?.lat, locality?.lon, dayForecast, weatherModel],
		queryFn: () =>
			getDailyWeatherForecast({
				lat: Number(locality?.lat),
				lon: Number(locality?.lon),
				days: Number(dayForecast),
				weatherModel,
			}),
		enabled: !!locality,
	})

	

	return (
		<section className={cn('w-full flex flex-col items-center gap-8', className)}>
			<h1 className='text-2xl font-bold'>
				Прогноз погоды на {dayForecast} {dayForecast === '3' ? 'дня' : 'дней'}
			</h1>
			<Tabs
				defaultValue='3'
				value={dayForecast}
				onValueChange={(value) => {
					setDayForecast(value)
					// if (locality) getWeather(value)
				}}
			>
				<TabsList>
					<TabsTrigger disabled={query.isLoading} value='3'>
						3 дня
					</TabsTrigger>
					<TabsTrigger disabled={query.isLoading} value='7'>
						7 дней
					</TabsTrigger>
					<TabsTrigger disabled={query.isLoading} value='16'>
						16 дней
					</TabsTrigger>
				</TabsList>
			</Tabs>
			<div className='w-full grid gap-4 relative grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] min-h-40'>
				{query.isLoading ? (
					<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
						<LoaderPinwheel className='w-8 h-8 m-auto animate-spin' />
					</div>
				) : query.data ? (
					query.data.daily.map((item, i) => <DayWeatherForecastCard key={i} {...item} />)
				) : (
					<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
						<h6 className='text-center'>Нет данных</h6>
					</div>
				)}

				{/* {
					[...Array(Number(dayForecast))].map((_, i) => (
						<DayWeatherForecastCard key={i} />
					))
				} */}
			</div>
		</section>
	)
}

import { FC, useState } from 'react'
import { useQuery } from 'react-query'

import { AverageDayForecast } from '../shared/averageDayForecast'
import { DayWeatherForecastCard } from '../shared/day-weather-forecast-card'
import { AnimationTabs } from '../ui/animation-tabs'
import { Skeleton } from '../ui/skeleton'
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
		<section className={cn('flex w-full flex-col items-center gap-4', className)}>
			<h1 className='text-2xl font-bold'>
				Прогноз погоды на {dayForecast} {dayForecast === '3' ? 'дня' : 'дней'}
			</h1>

			<div className='flex flex-row justify-center gap-4'>
				<AnimationTabs
					isNotContent
					defaultTab={1}
					onChange={(activeTab) =>
						setDayForecast(activeTab === 1 ? '3' : activeTab === 2 ? '7' : '16')
					}
					tabs={[
						{
							id: 1,
							label: '3 дня',
						},
						{
							id: 2,
							label: '7 дней',
						},
						{
							id: 3,
							label: '16 дней',
						},
					]}
				/>

				{query.isLoading ? (
					<Skeleton className='h-10 w-10 rounded-lg' />
				) : query.data ? (
					<AverageDayForecast dayForecast={dayForecast} data={query.data} />
				) : (
					<Skeleton className='h-10 w-10 rounded-md' />
				)}
			</div>

			<div className='relative grid min-h-40 w-full grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-4'>
				{query.isLoading
					? new Array(Number(dayForecast))
							.fill(null)
							.map((_, i) => <Skeleton key={i} className='h-[217px] w-full rounded-3xl' />)
					: query.data
						? query.data.daily.map((item, i) => <DayWeatherForecastCard key={i} {...item} />)
						: new Array(Number(dayForecast))
								.fill(null)
								.map((_, i) => <Skeleton key={i} className='h-[217px] w-full rounded-3xl' />)}
			</div>
		</section>
	)
}

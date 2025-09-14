import { FC, useEffect } from 'react'

import { ScrollArea } from '../../ui/scroll-area'
import { Separator } from '../../ui/separator'
import { Skeleton } from '../../ui/skeleton'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useCurrentWeatherForecast } from '@/hooks/useCurrentWeatherForecast'
import { useUserLocality } from '@/hooks/useUserLocality'
import { cn } from '@/lib/utils'
import { getWindDirection } from '@/lib/windDirection'
import type { PropsWithClassName } from '@/types/other'

export const CurrentWeatherForecastCard: FC<PropsWithClassName> = ({ className }) => {
	const locality = useUserLocality((state) => state.locality)
	const weatherModel = useUserLocality((state) => state.weatherModel)
	const { getWeatherForecast, weatherLoading, weatherForecast } = useCurrentWeatherForecast()

	const isRendered = !(!weatherLoading && Boolean(weatherForecast))

	const date = new Date()

	const localityNameLength = locality ? locality.name.length : 0

	useEffect(() => {
		if (locality) {
			getWeatherForecast({
				lat: Number(locality.lat),
				lon: Number(locality.lon),
				weatherModel,
			})
		}
	}, [locality, weatherModel])

	const img =
		weatherForecast && weatherForecast.yesterdayTemperature > weatherForecast.temperature
			? 'thermometer-colder.svg'
			: 'thermometer-warmer.svg'

	return (
		<Card className={cn('relative min-h-[330px] w-full rounded-3xl p-0', className)}>
			<CardHeader className='flex flex-col p-4'>
				<h2 className={cn('text-lg', localityNameLength > 40 && 'text-sm')}>
					<ScrollArea className='h-10 w-full'>
						{locality ? locality.name : <Skeleton className='h-5 w-full' />}
					</ScrollArea>
				</h2>
				<div className='flex flex-row justify-between gap-1'>
					{isRendered ? (
						<Skeleton className='h-5 w-24' />
					) : (
						<p className='text-muted-foreground text-sm'>
							Сейчас {date.toLocaleTimeString()?.slice(0, -3)}
						</p>
					)}

					{isRendered ? (
						<Skeleton className='h-5 w-24' />
					) : (
						<p className='text-sm'>{date.toLocaleDateString('ru', { weekday: 'long' })}</p>
					)}
				</div>
			</CardHeader>
			<Separator />
			<CardContent className='flex flex-col gap-1 p-0 pb-0'>
				<div className='flex flex-row items-center justify-between gap-2 px-4'>
					{isRendered ? (
						<Skeleton className='h-8 w-40' />
					) : (
						<p className='text-muted-foreground text-sm'>
							Вчера в это время {weatherForecast?.yesterdayTemperature}°C
						</p>
					)}

					{isRendered ? (
						<Skeleton className='mt-1 h-12 w-12' />
					) : (
						<img src={`/icons/${img}`} alt='' className='h-12 w-12' />
					)}
				</div>
				<Separator className='w-full' />
				<div className='flex flex-row items-center justify-between gap-2 px-4'>
					{isRendered ? (
						<Skeleton className='mb-1 h-[110px] w-[120px]' />
					) : (
						<img src={weatherForecast?.weatherIcon} alt='weather' className='h-[120px] w-[120px]' />
					)}

					<div className='flex flex-1 flex-col items-center justify-center gap-1'>
						{isRendered ? (
							<>
								<Skeleton className='h-5 w-24' />
								<Skeleton className='h-5 w-24' />
							</>
						) : (
							<>
								<p className='text-2xl font-bold'>{weatherForecast?.temperature}°C</p>
								<p className='text-muted-foreground text-sm'>
									Ощущается как {weatherForecast?.apparentTemperature}°C
								</p>
							</>
						)}

						<Separator className='w-full' />
						{isRendered ? (
							<Skeleton className='h-5 w-28' />
						) : (
							<p className='text-muted-foreground text-sm'>{weatherForecast?.weatherDescription}</p>
						)}
					</div>
				</div>
			</CardContent>
			<Separator />
			<CardFooter className='flex flex-row justify-between gap-2 p-2 px-4'>
				{isRendered ? (
					<>
						<Skeleton className='h-8 w-24' />
						<Skeleton className='h-8 w-24' />
						<Skeleton className='h-8 w-24' />
					</>
				) : (
					<>
						<div className='flex flex-row items-center gap-2'>
							<img src='/icons/wind.svg' alt='Logo' width={42} height={42} />
							<p className='text-muted-foreground text-sm'>{weatherForecast?.windSpeed} м/с</p>
						</div>
						<div className='flex flex-row items-center gap-2'>
							<img src='/icons/humidity.svg' alt='Logo' width={42} height={42} />
							<p className='text-muted-foreground text-sm'>{weatherForecast?.relativeHumidity}%</p>
						</div>
						<div className='flex flex-row items-center gap-2'>
							<img src='/icons/compass.svg' alt='Logo' width={42} height={42} />
							<p className='text-muted-foreground text-sm'>
								{weatherForecast && getWindDirection(weatherForecast.windDirection)}
							</p>
						</div>
					</>
				)}
			</CardFooter>
		</Card>
	)
}

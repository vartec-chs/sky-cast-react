import { FC, useEffect } from 'react'

import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import { Skeleton } from '../ui/skeleton'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useCurrentWeatherForecast } from '@/hooks/useCurrentWeatherForecast'
import { useUserLocality } from '@/hooks/useUserLocality'
import { cn } from '@/lib/utils'
import { getWindDirection } from '@/lib/windDirection'
import { PropsWithClassName } from '@/types/other'

export const CurrentWeatherForecastCard: FC<PropsWithClassName> = ({ className }) => {
	const [locality, weatherModel] = useUserLocality((state) => [state.locality, state.weatherModel])
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
		<Card className={cn('w-full relative  p-0 rounded-3xl min-h-[330px]', className)}>
			<CardHeader className='flex flex-col p-4 '>
				<h2 className={cn('text-lg', localityNameLength > 40 && 'text-sm')}>
					<ScrollArea className='w-full h-10'>
						{locality ? locality.name : <Skeleton className='w-full h-5' />}
					</ScrollArea>
				</h2>
				<div className='flex flex-row gap-1 justify-between'>
					{isRendered ? (
						<Skeleton className='w-24 h-5' />
					) : (
						<p className='text-sm text-muted-foreground'>
							Сейчас {date.toLocaleTimeString()?.slice(0, -3)}
						</p>
					)}

					{isRendered ? (
						<Skeleton className='w-24 h-5' />
					) : (
						<p className='text-sm'>{date.toLocaleDateString('ru', { weekday: 'long' })}</p>
					)}
				</div>
			</CardHeader>
			<Separator />
			<CardContent className='flex flex-col gap-1 p-0 pb-0'>
				<div className='flex flex-row gap-2 items-center justify-between px-4'>
					{isRendered ? (
						<Skeleton className='w-40 h-8' />
					) : (
						<p className='text-sm text-muted-foreground'>
							Вчера в это время {weatherForecast?.yesterdayTemperature}°C
						</p>
					)}

					{isRendered ? (
						<Skeleton className='w-12 h-12 mt-1' />
					) : (
						<img src={`/icons/${img}`} alt='' className='w-12 h-12' />
					)}
				</div>
				<Separator className='w-full' />
				<div className='flex flex-row gap-2 items-center justify-between px-4'>
					{isRendered ? (
						<Skeleton className='w-[120px] h-[110px] mb-1' />
					) : (
						<img src={weatherForecast?.weatherIcon} alt='weather' className='w-[120px] h-[120px]' />
					)}

					<div className='flex flex-col gap-1 items-center justify-center flex-1'>
						{isRendered ? (
							<>
								<Skeleton className='w-24 h-5' />
								<Skeleton className='w-24 h-5' />
							</>
						) : (
							<>
								<p className='text-2xl font-bold'>{weatherForecast?.temperature}°C</p>
								<p className='text-sm text-muted-foreground'>
									Ощущается как {weatherForecast?.apparentTemperature}°C
								</p>
							</>
						)}

						<Separator className='w-full' />
						{isRendered ? (
							<Skeleton className='w-28 h-5' />
						) : (
							<p className='text-sm text-muted-foreground'>{weatherForecast?.weatherDescription}</p>
						)}
					</div>
				</div>
			</CardContent>
			<Separator />
			<CardFooter className='flex flex-row gap-2 p-2 px-4 justify-between'>
				{isRendered ? (
					<>
						<Skeleton className='w-24 h-8' />
						<Skeleton className='w-24 h-8' />
						<Skeleton className='w-24 h-8' />
					</>
				) : (
					<>
						<div className='flex flex-row items-center gap-2'>
							<img src='/icons/wind.svg' alt='Logo' width={42} height={42} />
							<p className='text-sm text-muted-foreground '>{weatherForecast?.windSpeed} м/с</p>
						</div>
						<div className='flex flex-row items-center gap-2'>
							<img src='/icons/humidity.svg' alt='Logo' width={42} height={42} />
							<p className='text-sm text-muted-foreground '>{weatherForecast?.relativeHumidity}%</p>
						</div>
						<div className='flex flex-row items-center gap-2'>
							<img src='/icons/compass.svg' alt='Logo' width={42} height={42} />
							<p className='text-sm text-muted-foreground '>
								{weatherForecast && getWindDirection(weatherForecast.windDirection)}
							</p>
						</div>
					</>
				)}
			</CardFooter>
		</Card>
	)
}

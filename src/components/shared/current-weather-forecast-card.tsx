import { FC, useEffect } from 'react'

import { LoaderPinwheel } from 'lucide-react'

import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useCurrentWeatherForecast } from '@/hooks/useCurrentWeatherForecast'
import { useUserLocality } from '@/hooks/useUserLocality'
import { cn } from '@/lib/utils'
import { getWindDirection } from '@/lib/windDirection'
import { PropsWithClassName } from '@/types/other'

export const CurrentWeatherForecastCard: FC<PropsWithClassName> = ({ className }) => {
	const locality = useUserLocality((state) => state.locality)
	const { getWeatherForecast, weatherLoading, weatherForecast } = useCurrentWeatherForecast()

	const date = new Date()

	const localityNameLength = locality ? locality.name.length : 0

	useEffect(() => {
		if (locality) {
			getWeatherForecast({ lat: Number(locality.lat), lon: Number(locality.lon) })
		}
	}, [locality])

	const img =
		weatherForecast && weatherForecast.yesterdayTemperature > weatherForecast.temperature
			? 'thermometer-colder.svg'
			: 'thermometer-warmer.svg'

	return (
		<Card className={cn('w-full relative  p-0 rounded-3xl min-h-[355px]', className)}>
			{!weatherForecast || weatherLoading ? (
				<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
					<LoaderPinwheel className='animate-spin ' size={32} />
				</div>
			) : (
				<>
					<CardHeader className='flex flex-col p-4 '>
						<h2 className={cn('text-lg', localityNameLength > 30 && 'text-sm')}>
							<ScrollArea className='w-full h-10'>
								{locality ? locality.name : <LoaderPinwheel className='animate-spin' size={16} />}
							</ScrollArea>
						</h2>
						<div className='flex flex-row gap-1 justify-between'>
							<p className='text-sm text-muted-foreground'>
								Сейчас {date.toLocaleTimeString()?.slice(0, -3)}
							</p>
							<p className='text-sm'>{date.toLocaleDateString('ru', { weekday: 'long' })}</p>
						</div>
					</CardHeader>
					<Separator />
					<CardContent className='flex flex-col gap-1 p-0 pb-0'>
						<div className='flex flex-row gap-2 items-center justify-between px-4'>
							<p className='text-sm text-muted-foreground'>
								Вчера в это время {weatherForecast?.yesterdayTemperature}°C
							</p>
							<img src={`/icons/${img}`} alt='' className='w-12 h-12' />
						</div>
						<Separator className='w-full' />
						<div className='flex flex-row gap-2 items-center justify-between px-4'>
							<img
								src={weatherForecast?.weatherIcon}
								alt='weather'
								className='w-[120px] h-[120px]'
							/>
							<div className='flex flex-col gap-1 items-center justify-center flex-1'>
								<p className='text-2xl font-bold'>{weatherForecast?.temperature}°C</p>
								<p className='text-sm text-muted-foreground'>
									Ощущается как {weatherForecast?.apparentTemperature}°C
								</p>
								<Separator className='w-full' />
								<p className='text-sm text-muted-foreground'>
									{weatherForecast?.weatherDescription}
								</p>
							</div>
						</div>
					</CardContent>
					<Separator />
					<CardFooter className='flex flex-row gap-2 p-4 justify-between'>
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
					</CardFooter>
				</>
			)}
		</Card>
	)
}

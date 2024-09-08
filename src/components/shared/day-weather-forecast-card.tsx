import { FC } from 'react'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { PropsWithClassName } from '@/types/other'
import { getWindDirection } from '@/lib/windDirection'

type Props = {
	date: string
	nameDay: string
	minTemp: number
	maxTemp: number
	weatherIcon: string
	weatherDescription: string
	precipitationProbability: number
	windSpeed: number
	windDirection: number
} & PropsWithClassName

export const DayWeatherForecastCard: FC<Props> = ({ className, ...props }) => {
	const {
		date,
		nameDay,
		minTemp,
		maxTemp,
		weatherIcon,
		weatherDescription,
		precipitationProbability,
		windSpeed,
		windDirection,
	} = props

	return (
		<Card className={cn('rounded-3xl w-full', className)}>
			<CardHeader className='p-4'>
				<div className='flex flex-row items-center justify-between'>
					<h2 className='text-sm font-bold'>{nameDay}</h2>
					<p className='text-sm text-center text-muted-foreground'>{date}</p>
				</div>
			</CardHeader>

			<CardContent className='flex flex-col  gap-2 p-2 px-4'>
				<div className='flex flex-row items-center justify-between'>
					<img src={weatherIcon} alt='Logo' width={82} height={82} />
					<div className='flex flex-1 flex-col gap-1 items-center justify-center'>
						<p className='text-sm  font-bold'>
							<span className='text-muted-foreground'>Мин:</span> {minTemp}°C /
							<span className='text-muted-foreground'>Макс:</span> {maxTemp}°C
						</p>
						<p className='text-sm  text-muted-foreground'>{weatherDescription}</p>
					</div>
				</div>

				<div className='flex flex-row gap-1 justify-between p-2'>
					<div className='flex flex-row items-center gap-2'>
						<img src='/icons/wind.svg' alt='Logo' width={42} height={42} />
						<p className='text-sm text-muted-foreground '>{windSpeed} м/с</p>
					</div>
					<div className='flex flex-row items-center gap-2'>
						<img src='/icons/raindrop.svg' alt='Logo' width={42} height={42} />
						<p className='text-sm text-muted-foreground '>{precipitationProbability}%</p>
					</div>
					<div className='flex flex-row items-center gap-2'>
						<img src='/icons/compass.svg' alt='Logo' width={42} height={42} />
						<p className='text-sm text-muted-foreground '>{getWindDirection(windDirection)}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

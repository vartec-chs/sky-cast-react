import { FC } from 'react'

import { Logo } from '../../shared/logo'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { getWindDirection } from '@/lib/windDirection'
import type { PropsWithClassName } from '@/types/other'

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
		<Card className={cn('w-full rounded-3xl', className)}>
			<CardHeader className='p-4'>
				<div className='flex flex-row items-center justify-between'>
					<h2 className='text-sm font-bold'>{nameDay}</h2>
					<p className='text-muted-foreground text-center text-sm'>{date}</p>
				</div>
			</CardHeader>

			<CardContent className='flex flex-col gap-2 p-2 px-4'>
				<div className='flex flex-row items-center justify-between'>
					{weatherIcon ? (
						<img src={weatherIcon} alt='Logo' width={82} height={82} />
					) : (
						<Logo className='text-muted-foreground h-20 w-20 animate-pulse' />
					)}

					<div className='flex flex-1 flex-col items-center justify-center gap-1'>
						<p className='text-sm font-bold'>
							<span className='text-muted-foreground'>Мин:</span> {minTemp}°C /
							<span className='text-muted-foreground'>Макс:</span> {maxTemp}°C
						</p>
						<p className='text-muted-foreground text-sm'>{weatherDescription}</p>
					</div>
				</div>

				<div className='flex flex-row justify-between gap-1 p-2'>
					<div className='flex flex-row items-center gap-2'>
						<img src='/icons/wind.svg' alt='Logo' width={42} height={42} />
						<p className='text-muted-foreground text-sm'>{windSpeed} м/с</p>
					</div>
					<div className='flex flex-row items-center gap-2'>
						<img src='/icons/raindrop.svg' alt='Logo' width={42} height={42} />
						<p className='text-muted-foreground text-sm'>{precipitationProbability}%</p>
					</div>
					<div className='flex flex-row items-center gap-2'>
						<img src='/icons/compass.svg' alt='Logo' width={42} height={42} />
						<p className='text-muted-foreground text-sm'>{getWindDirection(windDirection)}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

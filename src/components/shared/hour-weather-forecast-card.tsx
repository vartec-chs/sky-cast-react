import { FC } from 'react'

import { Card, CardContent, CardHeader } from '../ui/card'
import { cn } from '@/lib/utils'
import { PropsWithClassName } from '@/types/other'

type Props = {
	time: string
	temperature: number
	icon: string
	precipitationProbability: number
} & PropsWithClassName

export const OneHourWeatherForecastCard: FC<Props> = ({
	className,
	time,
	temperature,
	icon,
	precipitationProbability,
}) => {
	return (
		<Card
			className={cn('flex-1 rounded-2xl px-2 py-2 min-w-20 border-none shadow-none', className)}
		>
			<CardHeader className='px-2 py-0'>
				<p className='text-md text-center text-muted-foreground'>{time}</p>
			</CardHeader>

			<CardContent className='flex flex-col items-center justify-center gap-2 px-2 py-0'>
				<img src={icon} alt='Logo' width={78} height={78} />
				<p className='text-sm text-center font-bold'>{temperature}°C</p>
				<p className='text-sm text-center text-blue-500'>{precipitationProbability}%</p>
			</CardContent>
		</Card>
	)
}

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
	const isCurrent = time === 'Сейчас'

	return (
		<Card
			className={cn(
				'min-w-20 flex-1 rounded-2xl border-none px-2 py-2 shadow-none',

				isCurrent && 'border bg-slate-200 dark:bg-slate-800',
				className,
			)}
		>
			<CardHeader className='px-2 py-0'>
				<p
					className={cn(
						'text-md text-muted-foreground text-center',
						isCurrent && 'font-bold text-blue-500',
					)}
				>
					{time}
				</p>
			</CardHeader>

			<CardContent className='flex flex-col items-center justify-center gap-2 px-2 py-0'>
				<img src={icon} alt='Logo' width={78} height={78} />
				<p className='text-center text-sm font-bold'>{temperature}°C</p>
				<p className='text-center text-sm text-blue-500'>{precipitationProbability}%</p>
			</CardContent>
		</Card>
	)
}

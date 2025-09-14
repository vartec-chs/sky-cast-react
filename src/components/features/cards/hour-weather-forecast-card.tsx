import { FC } from 'react'

import { Card, CardContent, CardHeader } from '../../ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import type { PropsWithClassName } from '@/types/other'

type Props = {
	time: string
	temperature: number
	icon: string
	description: string
	precipitationProbability: number
} & PropsWithClassName

export const OneHourWeatherForecastCard: FC<Props> = ({
	className,
	time,
	temperature,
	icon,
	description,
	precipitationProbability,
}) => {
	const isCurrent = time === 'Сейчас'

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Card
						className={cn(
							'min-w-20 flex-1 rounded-2xl border-none px-1 py-1 shadow-none transition-colors hover:bg-slate-100 dark:hover:bg-slate-700',

							isCurrent && 'border bg-slate-100 dark:bg-slate-900',
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
				</TooltipTrigger>
				<TooltipContent className='max-w-xs'>
					<p>{description}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

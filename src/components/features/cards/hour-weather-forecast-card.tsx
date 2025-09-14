import { FC, useState } from 'react'

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
	const [open, setOpen] = useState(false)
	const isCurrent = time === 'Сейчас'

	return (
		<TooltipProvider>
			<Tooltip open={open} onOpenChange={setOpen}>
				<TooltipTrigger asChild>
					<Card
						onClick={() => {
							window.scrollTo({ top: 0, behavior: 'smooth' })
							setOpen(!open)
						}}
						className={cn(
							'min-w-20 flex-1 rounded-2xl border-none px-1 py-1 shadow-none transition-colors hover:bg-slate-100 active:bg-slate-200 dark:hover:bg-slate-700 dark:active:bg-slate-800',

							isCurrent && 'border bg-slate-100 dark:bg-slate-900',
							open && 'border bg-slate-100 dark:bg-slate-800',
							className,
						)}
					>
						<CardHeader
							className={cn('px-2 py-0', isCurrent && 'mb-1 flex flex-col items-center gap-0')}
						>
							<p
								className={cn(
									'text-md text-muted-foreground text-center',
									isCurrent && 'font-bold text-blue-500',
								)}
							>
								{time}
								{isCurrent && (
									<p className='text-[12px]'>
										{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
									</p>
								)}
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

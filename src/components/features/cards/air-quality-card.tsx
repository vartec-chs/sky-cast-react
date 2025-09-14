import type { FC } from 'react'

import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { getAirQualityLevel } from '@/lib/airQuality'
import { cn } from '@/lib/utils'
import { PropsWithClassName } from '@/types/other'

type Props = PropsWithClassName & {
	airQualityIndex?: number
	isLoading: boolean
}

export const AirQualityCard: FC<Props> = ({ className, airQualityIndex: aqiValue, isLoading }) => {
	const isRendered = !isLoading && typeof aqiValue === 'number'
	let aqiIndex = Math.round(aqiValue || 0)

	const index = getAirQualityLevel(aqiIndex || 0)
	const color = index.color

	if (isLoading) {
		return (
			<Card className={cn('border-muted h-18 w-full rounded-2xl border p-2', className)}>
				<Skeleton className='h-full' />
			</Card>
		)
	}

	const icon = `/icons/smoke-particles.svg`

	return (
		<div
			className={cn(
				'border-muted flex items-center justify-between rounded-2xl border p-2',
				className,
			)}
		>
			<div className='flex w-full flex-row items-center justify-between gap-2 p-1'>
				<div className='flex flex-col items-center'>
					<h1 className='text-md font-semibold'>EU Качество воздуха</h1>
					<img className='h-8 w-8' src={icon} alt='' />
				</div>

				<div className='flex flex-col items-center rounded-full text-sm'>
					<div className='flex flex-row items-center gap-1'>
						<h2
							className={cn({
								'text-2xl font-bold': true,
								[color]: true,
							})}
						>
							{aqiIndex} <span className='text-xs'>EAQI</span>
						</h2>
					</div>

					<p className='text-muted-foreground text-sm'>({isRendered ? index.level : '...'})</p>
				</div>
			</div>
		</div>
	)
}

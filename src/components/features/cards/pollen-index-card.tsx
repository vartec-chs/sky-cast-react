import type { FC } from 'react'

import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { getPollenIndexLevel } from '@/lib/pollenIndex'
import { cn } from '@/lib/utils'
import { CurrentUnits, Pollens, PropsWithClassName } from '@/types/other'

type Props = PropsWithClassName & {
	current?: CurrentUnits
	isLoading: boolean
}

export const PollenIndexCard: FC<Props> = ({ className, current, isLoading }) => {
	const isRendered = !isLoading && typeof current === 'object'

	const pollens: Pollens = {
		ragweed_pollen: current?.ragweed_pollen || 0,
		olive_pollen: current?.olive_pollen || 0,
		mugwort_pollen: current?.mugwort_pollen || 0,
		birch_pollen: current?.birch_pollen || 0,
		grass_pollen: current?.grass_pollen || 0,
		alder_pollen: current?.alder_pollen || 0,
	}

	const averagePollenIndex =
		Math.round(
			(Object.values(pollens).reduce((sum, value) => sum + value, 0) /
				Object.values(pollens).length) *
				10,
		) / 10 // округляем до одного знака после запятой

	const index = getPollenIndexLevel(averagePollenIndex)
	const color = index.color

	if (isLoading) {
		return (
			<Card className={cn('border-muted h-18 w-full rounded-2xl border p-2', className)}>
				<Skeleton className='h-full' />
			</Card>
		)
	}

	return (
		<div className={cn('border-muted rounded-2xl border p-2', className)}>
			<div className='flex w-full flex-row items-center justify-between gap-2 p-1'>
				<div className='flex flex-col items-center'>
					<h1 className='text-md font-semibold'>Индекс пыльцы</h1>
					<img className='h-8 w-8' src='/icons/star.svg' alt='' />
				</div>

				<div className='flex flex-col items-center rounded-full text-sm'>
					<div className='flex flex-row items-center gap-1'>
						<h2
							className={cn({
								'text-2xl font-bold': true,
								[color]: true,
							})}
						>
							{averagePollenIndex} <span className='text-xs'>g/m³</span>
						</h2>
					</div>

					<p className='text-muted-foreground text-sm'>({isRendered ? index.level : '...'})</p>
				</div>
			</div>
		</div>
	)
}

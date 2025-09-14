import type { FC } from 'react'

import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { getDustIndexLevel } from '@/lib/dustIndex'
import { cn } from '@/lib/utils'
import type { PropsWithClassName } from '@/types/other'

type Props = PropsWithClassName & {
	dust: number
	isLoading: boolean
}

export const DustIndexCard: FC<Props> = ({ className, dust, isLoading }) => {
	const isRendered = !isLoading && typeof dust === 'number'

	const index = getDustIndexLevel(dust)
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
					<h1 className='text-md font-semibold'>Индекс пыли</h1>
					<img className='h-8 w-8' src='/icons/dust.svg' alt='' />
				</div>

				<div className='flex flex-col items-center rounded-full text-sm'>
					<div className='flex flex-row items-center gap-1'>
						<h2
							className={cn({
								'text-2xl font-bold': true,
								[color]: true,
							})}
						>
							{dust} <span className='text-xs'>μg/m³</span>
						</h2>
					</div>

					<p className='text-muted-foreground text-sm'>({isRendered ? index.level : '...'})</p>
				</div>
			</div>
		</div>
	)
}

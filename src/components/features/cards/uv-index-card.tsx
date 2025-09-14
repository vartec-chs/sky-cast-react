import type { FC } from 'react'

import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { getUVIndexLevel } from '@/lib/uvIndex'
import  type { PropsWithClassName } from '@/types/other'

type Props = PropsWithClassName & {
	uvIndex?: number
	isLoading: boolean
}

export const UVIndexCard: FC<Props> = ({ className, uvIndex: uvValue, isLoading }) => {
	const isRendered = !isLoading && typeof uvValue === 'number'
	let uvIndex = Math.round(uvValue || 0)

	const index = getUVIndexLevel(uvIndex || 0)
	const color = index.color

	if (isLoading) {
		return (
			<Card className={cn('border-muted h-18 w-full rounded-2xl border p-2', className)}>
				<Skeleton className='h-full' />
			</Card>
		)
	}

	const icon =
		(uvIndex && uvIndex > 11) || uvIndex == 0
			? '/icons/uv-index.svg'
			: `/icons/uv-index-${uvIndex}.svg`

	return (
		<div
			className={cn(
				'border-muted flex items-center justify-between rounded-2xl border p-2',
				className,
			)}
		>
			<div className='flex w-full flex-row items-center justify-between gap-2 p-1'>
				<div className='flex flex-col items-center'>
					<h1 className='text-md font-semibold'>Индекс УФ</h1>
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
							{uvIndex} <span className='text-xs'>УФ</span>
						</h2>
					</div>

					<p className='text-muted-foreground text-sm'>({isRendered ? index.level : '...'})</p>
				</div>
			</div>
		</div>
	)
}

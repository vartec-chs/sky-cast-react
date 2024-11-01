import { type FC } from 'react'
import { useMedia } from 'react-use'

import { ChartColumnBig } from 'lucide-react'

import { Button } from '../ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { DailyWeatherForecast } from '@/types/wetherForecastServiceReturn'

type Props = {
	dayForecast: string
	data: DailyWeatherForecast
}

export const AverageDayForecast: FC<Props> = ({ dayForecast, data }) => {
	const isMobile = useMedia('(max-width: 768px)')

	const openButton = (
		<Button variant='outline' size='icon' className='p-2'>
			<ChartColumnBig className='h-6 w-6' />
		</Button>
	)

	const title = 'Усредненные погодные данные на'

	const renderData = (
		<div className='flex flex-col justify-center gap-1'>
			<p className='text-sm font-bold'>
				<span className='text-muted-foreground'>Мин:</span> {data.averageMinTemp}°C /
				<span className='text-muted-foreground'>Макс:</span> {data.averageMaxTemp}°C
			</p>
			<div className='flex flex-row items-center gap-1'>
				<p className='text-sm font-bold'>
					<span className='text-muted-foreground'>Осадки:</span> {data.averagePrecipitation}%
				</p>

				<p className='text-sm font-bold'>
					<span className='text-muted-foreground'>Ветер:</span> {data?.averageWindSpeed}
					м/с
				</p>
			</div>
		</div>
	)

	if (isMobile) {
		return (
			<Drawer>
				<DrawerTrigger asChild>{openButton}</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle className='flex gap-1 text-center text-lg font-bold'>
							{title}
							<p className='text-muted-foreground'>{dayForecast}</p>
							{dayForecast === '3' ? 'дня' : 'дней'}{' '}
						</DrawerTitle>
					</DrawerHeader>
					<div className='p-4 pt-2'> {renderData}</div>
				</DrawerContent>
			</Drawer>
		)
	}

	return (
		<Dialog>
			<DialogTrigger asChild>{openButton}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='flex gap-1 text-center text-lg font-bold'>
						{title}
						<p className='text-muted-foreground'>{dayForecast}</p>
						{dayForecast === '3' ? 'дня' : 'дней'}{' '}
					</DialogTitle>
				</DialogHeader>
				{renderData}
			</DialogContent>
		</Dialog>
	)
}

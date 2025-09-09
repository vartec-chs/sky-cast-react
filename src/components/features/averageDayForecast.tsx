import { type FC } from 'react'
import { useMedia } from 'react-use'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import { ChartColumnBig } from 'lucide-react'

import { Button } from '../ui/button'
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from '../ui/chart'
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
import { getWindDirection } from '@/lib/windDirection'
import { DailyWeatherForecast } from '@/types/wetherForecastServiceReturn'

type Props = {
	dayForecast: string
	data: DailyWeatherForecast
}
const title = 'Усредненные погодные данные на'

const chartConfig = {
	min: {
		label: 'Мин',
		color: '#3b82f6',
	},
	max: {
		label: 'Макс',
		color: '#FF9260FF',
	},
} satisfies ChartConfig

export const AverageDayForecast: FC<Props> = ({ dayForecast, data }) => {
	const isMobile = useMedia('(max-width: 768px)')

	const openButton = (
		<Button variant='outline' size='icon' className='p-2'>
			<ChartColumnBig className='h-6 w-6' />
		</Button>
	)

	const chartData: { day: string; min: number; max: number }[] = [
		...data.daily.slice(0, Number(dayForecast)).map((day) => ({
			day: day.date,
			min: day.minTemp,
			max: day.maxTemp,
		})),
	]

	const renderData = (
		<div className='flex flex-col justify-center gap-1'>
			<p className='text-center text-sm font-bold'>
				<span className='text-muted-foreground'>Мин:</span> {data.averageMinTemp}°C /
				<span className='text-muted-foreground'>Макс:</span> {data.averageMaxTemp}°C
			</p>
			<div className='flex flex-row justify-between gap-1 p-2'>
				<div className='flex flex-row items-center gap-2'>
					<img src='/icons/wind.svg' alt='Logo' width={42} height={42} />
					<p className='text-muted-foreground text-sm'>{data.averageWindSpeed} м/с</p>
				</div>
				<div className='flex flex-row items-center gap-2'>
					<img src='/icons/raindrop.svg' alt='Logo' width={42} height={42} />
					<p className='text-muted-foreground text-sm'>{data.averagePrecipitation}%</p>
				</div>
				<div className='flex flex-row items-center gap-2'>
					<img src='/icons/compass.svg' alt='Logo' width={42} height={42} />
					<p className='text-muted-foreground text-sm'>
						{getWindDirection(data.averageWindDirection)}
					</p>
				</div>
			</div>
			<ChartContainer config={chartConfig}>
				<AreaChart accessibilityLayer data={chartData}>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey='day'
						tickLine={false}
						axisLine={false}
						tickMargin={8}
						tickFormatter={(value) => value}
					/>
					<ChartTooltip cursor={false} content={<ChartTooltipContent indicator='line' />} />
					<defs>
						<linearGradient id='fillMax' x1='0' y1='0' x2='0' y2='1'>
							<stop offset='5%' stopColor='var(--color-max)' stopOpacity={0.8} />
							<stop offset='95%' stopColor='var(--color-max)' stopOpacity={0.1} />
						</linearGradient>
						<linearGradient id='fillMin' x1='0' y1='0' x2='0' y2='1'>
							<stop offset='5%' stopColor='var(--color-min)' stopOpacity={0.8} />
							<stop offset='95%' stopColor='var(--color-min)' stopOpacity={0.1} />
						</linearGradient>
					</defs>

					<Area
						dataKey='min'
						type='natural'
						fill='url(#fillMin)'
						fillOpacity={0.4}
						stroke='var(--color-min)'
						stackId='a'
					/>
					<Area
						dataKey='max'
						type='natural'
						fill='url(#fillMax)'
						fillOpacity={0.4}
						stroke='var(--color-max)'
						stackId='a'
					/>
					<ChartLegend content={<ChartLegendContent />} />
				</AreaChart>
			</ChartContainer>
		</div>
	)

	if (isMobile) {
		return (
			<Drawer>
				<DrawerTrigger asChild>{openButton}</DrawerTrigger>
				<DrawerContent className='rounded-t-3xl border-none'>
					<DrawerHeader>
						<DrawerTitle className='text-md flex justify-center gap-1 font-bold'>
							{title}
							<p className='text-muted-foreground'>{dayForecast}</p>
							{dayForecast === '3' ? 'дня' : 'дней'}
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
			<DialogContent className='max-w-md rounded-2xl p-4 sm:p-6 lg:p-8'>
				<DialogHeader>
					<DialogTitle className='flex gap-1 text-center text-lg font-bold'>
						{title}
						<p className='text-muted-foreground'>{dayForecast}</p>
						{dayForecast === '3' ? 'дня' : 'дней'}
					</DialogTitle>
				</DialogHeader>
				{renderData}
			</DialogContent>
		</Dialog>
	)
}

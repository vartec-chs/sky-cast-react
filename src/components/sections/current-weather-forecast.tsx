import { FC } from 'react'

import { AirQualitySection } from './air-quality'
import { CurrentWeatherForecastCard } from '@/components/features/cards/current-weather-forecast-card'
import { HourlyWeatherForecastCard } from '@/components/features/cards/hourly-weather-forecast-card'
import { cn } from '@/lib/utils'
import type { PropsWithClassName } from '@/types/other'

export const CurrentWeatherForecastSection: FC<PropsWithClassName> = ({ className }) => {
	return (
		<section
			className={cn(
				'flex w-full flex-row items-start gap-2 max-md:flex-col min-md:items-center',
				className,
			)}
		>
			<CurrentWeatherForecastCard className='flex-[0_0_35%]' />
			<div className='flex flex-1 flex-col gap-2'>
				<HourlyWeatherForecastCard />
				<AirQualitySection />
			</div>
		</section>
	)
}

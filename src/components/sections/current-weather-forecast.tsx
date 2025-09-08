import { FC } from 'react'

import { CurrentWeatherForecastCard } from '@/components/features/current-weather-forecast-card'
import { HourlyWeatherForecastCard } from '@/components/features/hourly-weather-forecast-card'
import { cn } from '@/lib/utils'
import { PropsWithClassName } from '@/types/other'

export const CurrentWeatherForecastSection: FC<PropsWithClassName> = ({ className }) => {
	return (
		<section className={cn('flex w-full flex-row items-start gap-4 max-md:flex-col', className)}>
			<CurrentWeatherForecastCard className='flex-[0_0_35%]' />
			<HourlyWeatherForecastCard />
		</section>
	)
}

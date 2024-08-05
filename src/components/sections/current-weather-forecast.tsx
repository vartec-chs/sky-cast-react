import { FC } from 'react'

import { CurrentWeatherForecastCard } from '@/components/shared/current-weather-forecast-card'
import { HourlyWeatherForecastCard } from '@/components/shared/hourly-weather-forecast-card'
import { cn } from '@/lib/utils'
import { PropsWithClassName } from '@/types/other'

export const CurrentWeatherForecastSection: FC<PropsWithClassName> = ({ className }) => {
	return (
		<section className={cn('w-full flex flex-row max-md:flex-col items-start gap-8', className)}>
			<CurrentWeatherForecastCard className='flex-[0_0_35%]' />
			<HourlyWeatherForecastCard />
		</section>
	)
}

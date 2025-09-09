import { FC } from 'react'
import { useQuery } from 'react-query'

import { PollenIndexCard } from '../features/cards/pollen-index-card'
import { UVIndexCard } from '../features/cards/uv-index-card'
import { useUserLocality } from '@/hooks/useUserLocality'
import { cn } from '@/lib/utils'
import { getAirQuality } from '@/services/airQuality'
import { AirQualityResponse, PropsWithClassName } from '@/types/other'

export const AirQualitySection: FC<PropsWithClassName> = ({ className }) => {
	const locality = useUserLocality((state) => state.locality)

	const query = useQuery<AirQualityResponse | undefined, Error>({
		queryKey: ['airQuality', locality?.lat, locality?.lon],
		queryFn: () => getAirQuality(Number(locality?.lat), Number(locality?.lon)),
		enabled: !!locality?.lat && !!locality?.lon,
	})
	const { data, isLoading, isError, error } = query
	if (isError) return <p>{error.message}</p>
	return (
		<section className={cn('flex w-full flex-row gap-4 max-sm:flex-col', className)}>
			<UVIndexCard isLoading={isLoading} uvIndex={data?.current?.uv_index} />
			<PollenIndexCard isLoading={isLoading} current={data?.current} />
		</section>
	)
}

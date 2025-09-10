import { FC } from 'react'
import { useQuery } from 'react-query'

import { DustIndexCard } from '../features/cards/dust-index-card'
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
		refetchOnWindowFocus: false,
	})
	const { data, isLoading, isError } = query
	if (isError) return null
	return (
		<section className={cn('flex w-full flex-row gap-2 max-sm:flex-col', className)}>
			<UVIndexCard
				isLoading={isLoading || !data?.current}
				uvIndex={data?.current?.uv_index_clear_sky}
			/>
			<PollenIndexCard isLoading={isLoading || !data?.current} current={data?.current} />
			<DustIndexCard isLoading={isLoading || !data?.current} dust={data?.current?.dust || 0} />
		</section>
	)
}

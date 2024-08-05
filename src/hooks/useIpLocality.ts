import { useState } from 'react'

import { useUserLocality } from './useUserLocality'
import { IpUserLocality } from '@/types/locality'

export const useIpLocality = () => {
	const [locality, setLocality] = useState<IpUserLocality | null>(null)
	const [loading, setLoading] = useState(false)
	const setUserLocality = useUserLocality((state) => state.setLocality)

	async function getLocality() {
		setLoading(true)
		const response = await fetch(
			'http://ip-api.com/json?lang=ru&fields=status,region,regionName,city,lat,lon',
			{
				referrerPolicy: 'unsafe-url',
			},
		)

		console.log(await response.json())

		const data = (await response.json()) as IpUserLocality

		setLocality(data)
		setUserLocality({
			lat: data.lat,
			lon: data.lon,
			name: data.regionName + ', ' + data.city,
		})
		setLoading(false)
	}

	return { locality, loading, getLocality }
}

import { useState } from 'react'

import { useUserLocality } from './useUserLocality'
import { IpUserLocality, LatLonUserLocality } from '@/types/locality'

export const useIpLocality = () => {
	const [locality, setLocality] = useState<IpUserLocality | null>(null)
	const [loading, setLoading] = useState(false)
	const setUserLocality = useUserLocality((state) => state.setLocality)

	async function getLocality() {
		setLoading(true)
		const response = await fetch(
			// 'http://ip-api.com/json?lang=ru&fields=status,region,regionName,city,lat,lon',
			'https://freeipapi.com/api/json',
		)

		console.log(response)

		const data = (await response.json()) as IpUserLocality

		const responseLatLone = await fetch(
			`https://nominatim.openstreetmap.org/reverse?lat=${data.latitude}&lon=${data.longitude}&format=json`,
		)
		const dataLatLone = (await response.json()) as LatLonUserLocality

		setLocality(data)
		setUserLocality({
			lat: data.latitude,
			lon: data.longitude,
			name: dataLatLone.address.state + ', ' + dataLatLone.address.city,
		})
		setLoading(false)
	}

	return { locality, loading, getLocality }
}

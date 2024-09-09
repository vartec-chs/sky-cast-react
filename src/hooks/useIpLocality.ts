import { useState } from 'react'

import { useUserLocality } from './useUserLocality'
import { IpUserLocality, LatLonUserLocality } from '@/types/locality'

export const useIpLocality = () => {
	const [locality, setLocality] = useState<IpUserLocality | null>(null)
	const [loading, setLoading] = useState(false)
	const setUserLocality = useUserLocality((state) => state.setLocality)

	async function getLocality() {
		setLoading(true)
		const response = await fetch('https://freeipapi.com/api/json')

		if (!response.ok) {
			setLoading(false)
			return
		}

		const data = (await response.json()) as IpUserLocality

		const responseLatLone = await fetch(
			`https://nominatim.openstreetmap.org/reverse?lat=${data.latitude}&lon=${data.longitude}&format=json`,
		)

		if (!responseLatLone.ok) {
			setLoading(false)
			return
		}

		const dataLatLone = (await responseLatLone.json()) as LatLonUserLocality

		const nameWithAddress = dataLatLone.address.state
			? dataLatLone.address.state + ', ' + dataLatLone.address.city
			: dataLatLone.address.city

		setLocality(data)
		setUserLocality({
			lat: data.latitude,
			lon: data.longitude,
			name: nameWithAddress,
		})
		setLoading(false)
	}

	return { locality, loading, getLocality }
}

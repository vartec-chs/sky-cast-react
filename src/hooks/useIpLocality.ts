import { useState } from 'react'

import { useUserLocality } from './useUserLocality'
import { IpUserLocality, LatLonUserLocality } from '@/types/locality'

export const useIpLocality = () => {
	const [locality, setLocality] = useState<IpUserLocality | null>(null)
	const [loading, setLoading] = useState(false)
	const setUserLocality = useUserLocality((state) => state.setLocality)

	async function getLocality() {
		setLoading(true)
		// const response = await fetch('https://freeipapi.com/api/json')
		const response = await fetch('http://ip-api.com/json')

		if (!response.ok) {
			setLoading(false)
			return
		}

		const data = (await response.json()) as IpUserLocality

		console.log('data ip', data)

		const responseLatLone = await fetch(
			`https://nominatim.openstreetmap.org/reverse?lat=${data.lat}&lon=${data.lon}&format=json`,
		)

		console.log('responseLatLone', responseLatLone)

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
			lat: String(data.lat),
			lon: String(data.lon),
			name: nameWithAddress,
		})
		setLoading(false)
	}

	return { locality, loading, getLocality }
}

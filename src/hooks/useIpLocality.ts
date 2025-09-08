import { useState } from 'react'

import { useUserLocality } from './useUserLocality'
import { IpUserLocality, LatLonUserLocality } from '@/types/locality'

export const useIpLocality = ({ onError }: { onError: (error: Error) => void }) => {
	const [locality, setLocality] = useState<IpUserLocality | null>(null)
	const [loading, setLoading] = useState(false)
	const setUserLocality = useUserLocality((state) => state.setLocality)

	async function getLocality() {
		try {
			setLoading(true)
			// const response = await fetch('https://freeipapi.com/api/json')
			const response = await fetch('https://ipapi.co/json')

			const data = (await response.json()) as IpUserLocality

			const responseLatLone = await fetch(
				`https://nominatim.openstreetmap.org/reverse?lat=${data.latitude}&lon=${data.longitude}&format=json`,
			)
			const dataLatLone = (await responseLatLone.json()) as LatLonUserLocality

			const nameWithAddress = dataLatLone.address.state
				? dataLatLone.address.state + ', ' + dataLatLone.address.city
				: dataLatLone.address.city

			setLocality(data)
			setUserLocality({
				lat: String(data.latitude),
				lon: String(data.longitude),
				name: nameWithAddress,
			})
		} catch (error) {
			console.log(error)
			if (error instanceof Error) onError(error)
		} finally {
			setLoading(false)
		}
	}

	return { locality, loading, getLocality }
}

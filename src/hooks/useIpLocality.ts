import { useState } from 'react'

import { useUserLocality } from './useUserLocality'
import { IpUserLocality, IpUserLocalityReserve, LatLonUserLocality } from '@/types/locality'

export const useIpLocality = ({ onError }: { onError: (error: Error) => void }) => {
	const [locality, setLocality] = useState<IpUserLocality | null>(null)
	const [loading, setLoading] = useState(false)
	const setUserLocality = useUserLocality((state) => state.setLocality)

	async function getLocality() {
		try {
			setLoading(true)
			// const response = await fetch('https://freeipapi.com/api/json')
			let response: IpUserLocality | null = null
			let response2: IpUserLocalityReserve | null = null
			try {
				response = await (await fetch('https://ipapi.co/json')).json()
				if (!response || !response.city) {
					response = null
					throw new Error('No city in response')
				}
			} catch {
				response2 = await (await fetch('https://ipwhois.app/json')).json()
			}

			const data: IpUserLocality =
				response ||
				({
					country_name: response2?.country,
					region: response2?.region,
					city: response2?.city,
					latitude: response2?.latitude,
					longitude: response2?.longitude,
				} as IpUserLocality)

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

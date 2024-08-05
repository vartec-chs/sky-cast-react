import { useState } from 'react'

import { useUserLocality } from './useUserLocality'
import { LatLonUserLocality } from '@/types/locality'

export const useGeolocation = ({ onError }: { onError?: (error: string) => void }) => {
	const [location, setLocation] = useState<{ lat: number; lon: number; name: string } | null>(null)
	const [loading, setLoading] = useState(false)
	const setUserLocality = useUserLocality((state) => state.setLocality)

	async function getLocation() {
		setLoading(true)
		navigator.geolocation.getCurrentPosition(
			async (position) => {
				const { latitude, longitude } = position.coords

				const response = await fetch(
					`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
				)
				const data = (await response.json()) as LatLonUserLocality

				setLocation({
					lat: latitude,
					lon: longitude,
					name: data.address.state + ', ' + data.address.city,
				})

				setUserLocality({
					lat: String(latitude),
					lon: String(longitude),
					name: data.address.state + ', ' + data.address.city,
				})

				setLoading(false)
			},
			(error) => {
				onError && onError(error.message)
				setLoading(false)
			},
		)
	}

	return {
		location,
		loading,
		getLocation,
	}
}

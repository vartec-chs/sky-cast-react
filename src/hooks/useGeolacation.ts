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

				const nameWithAddress = data.address.state
					? data.address.state + ', ' + data.address.city
					: data.address.city

				setLocation({
					lat: latitude,
					lon: longitude,
					name: nameWithAddress,
				})

				setUserLocality({
					lat: String(latitude),
					lon: String(longitude),
					name: nameWithAddress,
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

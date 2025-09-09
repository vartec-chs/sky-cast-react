import { AirQualityResponse } from '@/types/other'

// https://air-quality-api.open-meteo.com/v1/air-quality?latitude=52.52&longitude=13.41&current=european_aqi,pm10,pm2_5,dust,uv_index,uv_index_clear_sky,ragweed_pollen,olive_pollen,mugwort_pollen,birch_pollen,grass_pollen,alder_pollen&forecast_days=1

export const getAirQuality = async (
	lat: number,
	lon: number,
): Promise<AirQualityResponse | undefined> => {
	console.log('Fetching air quality data for:', { lat, lon })
	const params = new URLSearchParams({
		latitude: lat.toString(),
		longitude: lon.toString(),
		current:
			'european_aqi,pm10,pm2_5,dust,uv_index,uv_index_clear_sky,ragweed_pollen,olive_pollen,mugwort_pollen,birch_pollen,grass_pollen,alder_pollen',
		forecast_days: '1',
	})

	const response = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?${params}`)
	if (!response.ok) throw new Error('Failed to fetch air quality data')

	return await response.json()
}

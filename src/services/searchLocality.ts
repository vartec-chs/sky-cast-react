import type {  SecrchLocalityOpenMeteo } from '@/types/locality'

export const searchLocality = async (
	searchText: string,
): Promise<SecrchLocalityOpenMeteo[] | undefined> => {
	try {
		// const response = await fetch(
		// 	`https://nominatim.openstreetmap.org/search?q=${searchText}&format=json&limit=5`,
		// )

		//https://geocoding-api.open-meteo.com/v1/search?name=%D0%92%D0%BE%D1%80%D0%BE%D0%BD%D0%B5%D0%B6&count=10&language=ru&format=json
		const response = await fetch(
			`https://geocoding-api.open-meteo.com/v1/search?name=${searchText}&count=10&language=ru&format=json`,
		)

		const results = (await response.json()).results as SecrchLocalityOpenMeteo[] | undefined

		if (!results || results.length === 0) {
			return []
		}

		return results
	} catch (error) {
		console.log('Search locality error: ', error)
		return undefined
	}
}

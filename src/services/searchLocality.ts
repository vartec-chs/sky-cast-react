import { SecrchLocality } from '@/types/locality'

export const searchLocality = async (searchText: string): Promise<SecrchLocality[] | undefined> => {
	try {
		const response = await fetch(
			`https://nominatim.openstreetmap.org/search?q=${searchText}&format=json&limit=5`,
		)

		const data = (await response.json()) as SecrchLocality[]

		return data
	} catch (error) {
		console.log('Search locality error: ', error)
		return undefined
	}
}

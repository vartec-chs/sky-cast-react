import { create } from 'zustand'

type UserLocality = {
	locality?: {
		name: string
		lat: string
		lon: string
	}
	isAutoLocality: boolean
	weatherModel: string
	setWeatherModel: (model: string) => void
	setLocality: (locality: { lat: string; lon: string; name: string } | undefined) => void
}

export const useUserLocality = create<UserLocality>((set) => ({
	locality: undefined,
	isAutoLocality: true,
	setLocality: (locality) => set({ locality, isAutoLocality: false }),
	setWeatherModel: (model) => set({ weatherModel: model }),
	weatherModel: 'default',
}))

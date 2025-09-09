import { create } from 'zustand'

type UserLocality = {
	locality?: {
		name: string
		lat: string
		lon: string
	}
	isAutoLocality: boolean
	weatherModel: string
	isUsedFavoriteLocation?: boolean
	setWeatherModel: (model: string) => void
	setLocality: (locality: { lat: string; lon: string; name: string } | undefined) => void
	setIsUsedFavoriteLocation: (isUsed: boolean) => void
}

export const useUserLocality = create<UserLocality>((set) => ({
	locality: undefined,
	isAutoLocality: true,
	isUsedFavoriteLocation: window.localStorage.getItem('isUsedFavoriteLocation') === '1',
	setLocality: (locality) => set({ locality, isAutoLocality: false }),
	setWeatherModel: (model) => set({ weatherModel: model }),
	setIsUsedFavoriteLocation: (isUsed) => set({ isUsedFavoriteLocation: isUsed }),
	weatherModel: 'default',
}))

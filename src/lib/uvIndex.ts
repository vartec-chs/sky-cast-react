import { UVIndexBreakpoints, UVIndexColors } from '@/types/other'

export function getUVIndexLevel(uvIndex: number) {
	if (uvIndex <= UVIndexBreakpoints[0]) {
		return { level: 'Низкий', color: UVIndexColors[0].color }
	}
	if (uvIndex <= UVIndexBreakpoints[1]) {
		return { level: 'Умеренный', color: UVIndexColors[1].color }
	}
	if (uvIndex <= UVIndexBreakpoints[2]) {
		return { level: 'Высокий', color: UVIndexColors[2].color }
	}
	if (uvIndex <= UVIndexBreakpoints[3]) {
		return { level: 'Очень высокий', color: UVIndexColors[3].color }
	}
	return { level: 'Экстремальный', color: UVIndexColors[4].color }
}

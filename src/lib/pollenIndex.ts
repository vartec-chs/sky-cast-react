const pollenIndexColors = [
	{ color: 'text-green-500', label: 'Низкий' },
	{ color: 'text-yellow-500', label: 'Средний' },
	{ color: 'text-red-500', label: 'Высокий' },
]
const pollenIndexBreakpoints = [10, 45]

export function getPollenIndexLevel(pollenIndex: number) {
	if (pollenIndex <= pollenIndexBreakpoints[0]) {
		return { level: 'Низкий', color: pollenIndexColors[0].color }
	}
	if (pollenIndex <= pollenIndexBreakpoints[1]) {
		return { level: 'Средний', color: pollenIndexColors[1].color }
	}
	return { level: 'Высокий', color: pollenIndexColors[2].color }
}

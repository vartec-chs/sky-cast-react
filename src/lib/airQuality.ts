export const getAirQualityLevel = (index: number) => {
	if (index >= 0 && index <= 20) {
		return { level: 'Хорошо', color: 'text-green-500' }
	} else if (index > 20 && index <= 40) {
		return { level: 'Удовлетворительно', color: 'text-yellow-500' }
	} else if (index > 40 && index <= 60) {
		return { level: 'Средне', color: 'text-orange-500' }
	} else if (index > 60 && index <= 80) {
		return { level: 'Плохо', color: 'text-red-500' }
	} else if (index > 80 && index <= 100) {
		return { level: 'Очень плохо', color: 'text-red-700' }
	} else {
		return { level: 'Критически', color: 'text-red-900' }
	}
}

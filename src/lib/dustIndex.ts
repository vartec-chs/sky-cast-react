

export const getDustIndexLevel = (index: number) => {
	if (index >= 0 && index <= 20) {
		return { level: 'Хорошо', color: 'text-green-500' }
	} else if (index > 20 && index <= 40) {
		return { level: 'Умеренно', color: 'text-yellow-500' }
	} else if (index > 40 && index <= 50) {
		return { level: 'Плохо для чувствительных групп', color: 'text-orange-500' }
	} else if (index > 50 && index <= 100) {
		return { level: 'Плохо', color: 'text-red-500' }
	} else if (index > 100 && index <= 200) {
		return { level: 'Очень плохо', color: 'text-purple-700' }
	} else {
		return { level: 'Опасно', color: 'text-black bg-red-700 px-1 rounded' }
	}
}

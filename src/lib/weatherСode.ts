export interface WeatherDescription {
	description: string
	image: string
}

const weatherCode: { [key: string]: { day: WeatherDescription; night: WeatherDescription } } = {
	'0': {
		day: { description: 'Ясно', image: '/icons/clear-day.svg' },
		night: { description: 'Ясно', image: '/icons/clear-night.svg' },
	},
	'1': {
		day: { description: 'Преимущественно ясно', image: '/icons/partly-cloudy-day.svg' },
		night: { description: 'Преимущественно ясно', image: '/icons/partly-cloudy-night.svg' },
	},
	'2': {
		day: { description: 'Переменная облачность', image: '/icons/partly-cloudy-day.svg' },
		night: { description: 'Переменная облачность', image: '/icons/partly-cloudy-night.svg' },
	},
	'3': {
		day: { description: 'Пасмурно', image: '/icons/overcast.svg' },
		night: { description: 'Пасмурно', image: '/icons/overcast.svg' },
	},
	'45': {
		day: { description: 'Туман', image: '/icons/fog-day.svg' },
		night: { description: 'Туман', image: '/icons/fog-night.svg' },
	},
	'48': {
		day: { description: 'Туман с изморозью', image: '/icons/fog-day.svg' },
		night: { description: 'Туман с изморозью', image: '/icons/fog-night.svg' },
	},
	'51': {
		day: { description: 'Моросящий дождь (слабый)', image: '/icons/drizzle.svg' },
		night: { description: 'Моросящий дождь (слабый)', image: '/icons/drizzle.svg' },
	},
	'53': {
		day: { description: 'Моросящий дождь (умеренный)', image: '/icons/drizzle.svg' },
		night: { description: 'Моросящий дождь (умеренный)', image: '/icons/drizzle.svg' },
	},
	'55': {
		day: { description: 'Моросящий дождь (сильный)', image: '/icons/drizzle.svg' },
		night: { description: 'Моросящий дождь (сильный)', image: '/icons/drizzle.svg' },
	},
	'56': {
		day: { description: 'Ледяная морось (слабая)', image: '/icons/sleet.svg' },
		night: { description: 'Ледяная морось (слабая)', image: '/icons/sleet.svg' },
	},
	'57': {
		day: { description: 'Ледяная морось (сильная)', image: '/icons/sleet.svg' },
		night: { description: 'Ледяная морось (сильная)', image: '/icons/sleet.svg' },
	},
	'61': {
		day: { description: 'Дождь (слабый)', image: '/icons/rain.svg' },
		night: { description: 'Дождь (слабый)', image: '/icons/rain.svg' },
	},
	'63': {
		day: { description: 'Дождь (умеренный)', image: '/icons/rain.svg' },
		night: { description: 'Дождь (умеренный)', image: '/icons/rain.svg' },
	},
	'65': {
		day: { description: 'Дождь (сильный)', image: '/icons/raindrops.svg' },
		night: { description: 'Дождь (сильный)', image: '/icons/raindrops.svg' },
	},
	'66': {
		day: { description: 'Ледяной дождь (слабый)', image: '/icons/sleet.svg' },
		night: { description: 'Ледяной дождь (слабый)', image: '/icons/sleet.svg' },
	},
	'67': {
		day: { description: 'Ледяной дождь (сильный)', image: '/icons/sleet.svg' },
		night: { description: 'Ледяной дождь (сильный)', image: '/icons/sleet.svg' },
	},
	'71': {
		day: { description: 'Снег (слабый)', image: '/icons/snow.svg' },
		night: { description: 'Снег (слабый)', image: '/icons/snow.svg' },
	},
	'73': {
		day: { description: 'Снег (умеренный)', image: '/icons/snow.svg' },
		night: { description: 'Снег (умеренный)', image: '/icons/snow.svg' },
	},
	'75': {
		day: { description: 'Снег (сильный)', image: '/icons/snow.svg' },
		night: { description: 'Снег (сильный)', image: '/icons/snow.svg' },
	},
	'77': {
		day: { description: 'Снежные зерна/крупинки', image: '/icons/snowflake.svg' },
		night: { description: 'Снежные зерна/крупинки', image: '/icons/snowflake.svg' },
	},
	'80': {
		day: { description: 'Ливневый дождь (слабый)', image: '/icons/raindrops.svg' },
		night: { description: 'Ливневый дождь (слабый)', image: '/icons/raindrops.svg' },
	},
	'81': {
		day: { description: 'Ливневый дождь (умеренный)', image: '/icons/raindrops.svg' },
		night: { description: 'Ливневый дождь (умеренный)', image: '/icons/raindrops.svg' },
	},
	'82': {
		day: { description: 'Ливневый дождь (сильный)', image: '/icons/raindrops.svg' },
		night: { description: 'Ливневый дождь (сильный)', image: '/icons/raindrops.svg' },
	},
	'85': {
		day: { description: 'Ливневый снег (слабый)', image: '/icons/snow.svg' },
		night: { description: 'Ливневый снег (слабый)', image: '/icons/snow.svg' },
	},
	'86': {
		day: { description: 'Ливневый снег (сильный)', image: '/icons/snow.svg' },
		night: { description: 'Ливневый снег (сильный)', image: '/icons/snow.svg' },
	},
	'95': {
		day: { description: 'Гроза', image: '/icons/thunderstorms.svg' },
		night: { description: 'Гроза', image: '/icons/thunderstorms-night.svg' },
	},
	'96': {
		day: { description: 'Гроза с градом (слабая)', image: '/icons/thunderstorms-rain.svg' },
		night: { description: 'Гроза с градом (слабая)', image: '/icons/thunderstorms-night-rain.svg' },
	},
	'99': {
		day: { description: 'Гроза с градом (сильная)', image: '/icons/hail.svg' },
		night: { description: 'Гроза с градом (сильная)', image: '/icons/hail.svg' },
	},
}

export function getWeatherDescription(code: number, isDay: number): WeatherDescription {
	const status = isDay === 1 ? 'day' : 'night'
	return weatherCode[String(code)]?.[status]
}

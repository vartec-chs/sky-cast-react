export interface WeatherDescription {
	description: string
	short: string
	image: string
}

const weatherCode: { [key: string]: { day: WeatherDescription; night: WeatherDescription } } = {
	'0': {
		day: { description: 'Ясно', short: 'Ясно', image: '/icons/clear-day.svg' },
		night: { description: 'Ясно', short: 'Ясно', image: '/icons/clear-night.svg' },
	},
	'1': {
		day: {
			description: 'Преимущественно ясная погода',
			short: 'Преимущественно ясно',
			image: '/icons/partly-cloudy-day.svg',
		},
		night: {
			description: 'Преимущественно ясная погода',
			short: 'Преимущественно ясно',
			image: '/icons/partly-cloudy-night.svg',
		},
	},
	'2': {
		day: {
			description: 'Переменная облачность',
			short: 'Переменная облачность',
			image: '/icons/partly-cloudy-day.svg',
		},
		night: {
			description: 'Переменная облачность',
			short: 'Переменная облачность',
			image: '/icons/partly-cloudy-night.svg',
		},
	},
	'3': {
		day: {
			description: 'Сплошная облачность (пасмурно)',
			short: 'Пасмурно',
			image: '/icons/overcast.svg',
		},
		night: {
			description: 'Сплошная облачность (пасмурно)',
			short: 'Пасмурно',
			image: '/icons/overcast.svg',
		},
	},
	'45': {
		day: { description: 'Туман', short: 'Туман', image: '/icons/fog-day.svg' },
		night: { description: 'Туман', short: 'Туман', image: '/icons/fog-night.svg' },
	},
	'48': {
		day: { description: 'Туман с изморозью', short: 'Туман/изморозь', image: '/icons/fog-day.svg' },
		night: {
			description: 'Туман с изморозью',
			short: 'Туман/изморозь',
			image: '/icons/fog-night.svg',
		},
	},
	'51': {
		day: { description: 'Морось (слабая)', short: 'Морось', image: '/icons/drizzle.svg' },
		night: { description: 'Морось (слабая)', short: 'Морось', image: '/icons/drizzle.svg' },
	},
	'53': {
		day: { description: 'Морось (умеренная)', short: 'Морось', image: '/icons/drizzle.svg' },
		night: { description: 'Морось (умеренная)', short: 'Морось', image: '/icons/drizzle.svg' },
	},
	'55': {
		day: {
			description: 'Морось (сильная)',
			short: 'Морось (сильная)',
			image: '/icons/drizzle.svg',
		},
		night: {
			description: 'Морось (сильная)',
			short: 'Морось (сильная)',
			image: '/icons/drizzle.svg',
		},
	},
	'56': {
		day: {
			description: 'Замерзающая морось (слабая)',
			short: 'Замерзающая морось',
			image: '/icons/sleet.svg',
		},
		night: {
			description: 'Замерзающая морось (слабая)',
			short: 'Замерзающая морось',
			image: '/icons/sleet.svg',
		},
	},
	'57': {
		day: {
			description: 'Замерзающая морось (сильная)',
			short: 'Замерзающая морось',
			image: '/icons/sleet.svg',
		},
		night: {
			description: 'Замерзающая морось (сильная)',
			short: 'Замерзающая морось',
			image: '/icons/sleet.svg',
		},
	},
	'61': {
		day: { description: 'Лёгкий дождь', short: 'Лёгкий дождь', image: '/icons/rain.svg' },
		night: { description: 'Лёгкий дождь', short: 'Лёгкий дождь', image: '/icons/rain.svg' },
	},
	'63': {
		day: { description: 'Умеренный дождь', short: 'Умеренный дождь', image: '/icons/rain.svg' },
		night: { description: 'Умеренный дождь', short: 'Умеренный дождь', image: '/icons/rain.svg' },
	},
	'65': {
		day: { description: 'Сильный дождь', short: 'Сильный дождь', image: '/icons/raindrops.svg' },
		night: { description: 'Сильный дождь', short: 'Сильный дождь', image: '/icons/raindrops.svg' },
	},
	'66': {
		day: {
			description: 'Замерзающий дождь (слабый)',
			short: 'Замерзающий дождь',
			image: '/icons/sleet.svg',
		},
		night: {
			description: 'Замерзающий дождь (слабый)',
			short: 'Замерзающий дождь',
			image: '/icons/sleet.svg',
		},
	},
	'67': {
		day: {
			description: 'Замерзающий дождь (сильный)',
			short: 'Замерзающий дождь',
			image: '/icons/sleet.svg',
		},
		night: {
			description: 'Замерзающий дождь (сильный)',
			short: 'Замерзающий дождь',
			image: '/icons/sleet.svg',
		},
	},
	'71': {
		day: { description: 'Небольшой снег', short: 'Небольшой снег', image: '/icons/snow.svg' },
		night: { description: 'Небольшой снег', short: 'Небольшой снег', image: '/icons/snow.svg' },
	},
	'73': {
		day: { description: 'Умеренный снег', short: 'Умеренный снег', image: '/icons/snow.svg' },
		night: { description: 'Умеренный снег', short: 'Умеренный снег', image: '/icons/snow.svg' },
	},
	'75': {
		day: { description: 'Сильный снегопад', short: 'Сильный снег', image: '/icons/snow.svg' },
		night: { description: 'Сильный снегопад', short: 'Сильный снег', image: '/icons/snow.svg' },
	},
	'77': {
		day: { description: 'Снежная крупа', short: 'Снежная крупа', image: '/icons/snowflake.svg' },
		night: { description: 'Снежная крупа', short: 'Снежная крупа', image: '/icons/snowflake.svg' },
	},
	'80': {
		day: {
			description: 'Кратковременные ливни',
			short: 'Кратковременные ливни',
			image: '/icons/raindrops.svg',
		},
		night: {
			description: 'Кратковременные ливни',
			short: 'Кратковременные ливни',
			image: '/icons/raindrops.svg',
		},
	},
	'81': {
		day: {
			description: 'Умеренные ливневые дожди',
			short: 'Умеренные ливни',
			image: '/icons/raindrops.svg',
		},
		night: {
			description: 'Умеренные ливневые дожди',
			short: 'Умеренные ливни',
			image: '/icons/raindrops.svg',
		},
	},
	'82': {
		day: {
			description: 'Сильные ливневые дожди',
			short: 'Сильные ливни',
			image: '/icons/raindrops.svg',
		},
		night: {
			description: 'Сильные ливневые дожди',
			short: 'Сильные ливни',
			image: '/icons/raindrops.svg',
		},
	},
	'85': {
		day: {
			description: 'Кратковременные снегопады (ливневого характера, слабые)',
			short: 'Кратковременные снегопады',
			image: '/icons/snow.svg',
		},
		night: {
			description: 'Кратковременные снегопады (ливневого характера, слабые)',
			short: 'Кратковременные снегопады',
			image: '/icons/snow.svg',
		},
	},
	'86': {
		day: {
			description: 'Интенсивные кратковременные снегопады (ливневого характера)',
			short: 'Интенсивные снегопады',
			image: '/icons/snow.svg',
		},
		night: {
			description: 'Интенсивные кратковременные снегопады (ливневого характера)',
			short: 'Интенсивные снегопады',
			image: '/icons/snow.svg',
		},
	},
	'95': {
		day: { description: 'Гроза', short: 'Гроза', image: '/icons/thunderstorms.svg' },
		night: { description: 'Гроза', short: 'Гроза', image: '/icons/thunderstorms-night.svg' },
	},
	'96': {
		day: {
			description: 'Гроза с возможным градом (слабая)',
			short: 'Гроза, возможен град',
			image: '/icons/thunderstorms-rain.svg',
		},
		night: {
			description: 'Гроза с возможным градом (слабая)',
			short: 'Гроза, возможен град',
			image: '/icons/thunderstorms-night-rain.svg',
		},
	},
	'99': {
		day: {
			description: 'Гроза с градом (сильная)',
			short: 'Гроза с градом',
			image: '/icons/hail.svg',
		},
		night: {
			description: 'Гроза с градом (сильная)',
			short: 'Гроза с градом',
			image: '/icons/hail.svg',
		},
	},
}

export function getWeatherDescription(code: number, isDay: number): WeatherDescription {
	const status = isDay === 1 ? 'day' : 'night'
	return weatherCode[String(code)]?.[status]
}
